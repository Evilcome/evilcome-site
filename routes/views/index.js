var keystone = require('keystone'),
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
	
	view.render('site/index');
}
