var keystone = require('keystone'),
	Post = keystone.list('Post'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'home';
	locals.page.title = 'Evilcome -- Share your game idea.';

	view.on('init', function(next) {
		User.model.find()
		.sort('createAt')
		.limit(100)
		.exec(function (err, members) {
			if (err) res.err(err);

			locals.members = members;
			next();
		});
	});

	view.on('init', function(next) {
		Post.model.findOne(function(err, post) {
			if (err) res.err(err);

			locals.post = post;
			next();
		});
	});
	
	view.render('site/index');
}
