var keystone = require('keystone'),
	async = require('async'),
	crypto = require('crypto'),
	Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
	autokey: { path: 'key', from: 'name', unique: true }
});

var deps = {
	github: { 'services.github.isConfigured': true }
}

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	resetPasswordKey: { type: String, hidden: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isVerified: { type: Boolean, label: 'Has a verified email address' }
}, 'Profile', {
	isPublic: { type: Boolean, default: true },
	photo: { type: Types.CloudinaryImage },
	github: { type: String, width: 'short' },
	twitter: { type: String, width: 'short' },
	website: { type: Types.Url },
	bio: { type: Types.Markdown },
	gravatar: { type: String, noedit: true },
	createAt: { type: Types.Date, default: Date.now, index: true }
}, 'Notifications', {
	notifications: {
		posts: { type: Boolean }
	}
}, 'Services', {
	services: {
		github: {
			isConfigured: { type: Boolean, label: 'GitHub has been authenticated' },
			
			profileId: { type: String, label: 'Profile ID', dependsOn: deps.github },
			
			username: { type: String, label: 'Username', dependsOn: deps.github },
			avatar: { type: String, label: 'Image', dependsOn: deps.github },
			
			accessToken: { type: String, label: 'Access Token', dependsOn: deps.github },
			refreshToken: { type: String, label: 'Refresh Token', dependsOn: deps.github }
		}
	}
});


/** 
	Pre-save
	=============
*/

User.schema.pre('save', function(next) {

	var member = this;
	
	async.parallel([
		
		function(done) {
			
			if (!member.email) return done();
			
			member.gravatar = crypto.createHash('md5').update(member.email.toLowerCase().trim()).digest('hex');
			
			return done();
			
		}
		
	], next);

});


/**
 * Virtuals
 * ========
 */

// Link to member
User.schema.virtual('url').get(function() {
	return '/member/' + this.key;
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

// Pull out avatar image
User.schema.virtual('avatarUrl').get(function() {
	
	if (this.photo.exists) return this._.photo.thumbnail(120,120);
	
	if (this.services.github.isConfigured && this.services.github.avatar) return this.services.github.avatar;
	
	if (this.gravatar) return 'http://www.gravatar.com/avatar/' + this.gravatar + '?d=http://evilcome.com/images/avatar.png';
	
});

// Usernames
User.schema.virtual('githubUsername').get(function() {
	return (this.services.github && this.services.github.isConfigured) ? this.services.github.username : '';
});

/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'author' });



/**
 * Methods
 * =======
*/

User.schema.methods.resetPassword = function(callback) {
	
	var user = this;
	
	user.resetPasswordKey = keystone.utils.randomString([16,24]);
	
	user.save(function(err) {
		
		if (err) return callback(err);
		
		new keystone.Email('forgotten-password').send({
			user: user,
			link: '/reset-password/' + user.resetPasswordKey,
			subject: 'Reset your Evilcome Password',
			to: user.email,
			from: {
				name: 'Evilcome',
				email: 'evilcome.com@gmail.com'
			}
		}, callback);
		
	});
	
}


/**
 * Registration
 */

User.addPattern('standard meta');
User.defaultColumns = 'name, email, isAdmin';
User.register();
