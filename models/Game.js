var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Game = new keystone.List('Game', {
	autokey: { path: 'key', from: 'name', unique: true }
});

Game.add({
	name: { type: String, required: true, initial: true },
	publishedAt: Date,
    image: { type: Types.CloudinaryImage },
    repositoryUrl: { type: Types.Url },
    shortDescription: { type: Types.Html, wysiwyg: true },
	description: { type: Types.Html, wysiwyg: true }
}, 'Platform', {
	ios: {
		isAvailable: { type: Boolean, label: 'IOS' },
		link: { type: Types.Url }
	},
	andriod: {
		isAvailable: { type: Boolean, label: 'ANDRIOD' },
		link: { type: Types.Url }
	},
	html5: {
		isAvailable: { type: Boolean, label: 'HTML5' },
		link: { type: Types.Url }
	}
});

Game.schema.virtual('url').get(function() {
	return '/games/' + this.key;
});

Game.addPattern('standard meta');
Game.defaultSort = '-publishedAt';
Game.defaultColumns = 'name, publishedAt, ios.isAvailable, andriod.isAvailable, html5.isAvailable';
Game.register();