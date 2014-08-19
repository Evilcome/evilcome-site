var keystone = require('keystone'),
	_ = require('underscore');

var User = keystone.list('User');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'members';
	locals.page.title = 'Members - Evilcome';


	// Load Organisers
	view.on('init', function(next) {
		User.model.find()
		.sort('name.first')
		.exec(function(err, organisers) {
			if (err) res.err(err);
			locals.organisers = organisers;
			next();
		});
	});


	// Pluck IDs for filtering Community

	view.on('init', function(next) {
		locals.organiserIDs = _.pluck(locals.organisers, 'id');
		next();
	});

	view.render('site/members');
}
