var keystone = require('keystone');

var Game = keystone.list('Game');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'games';
	locals.page.title = 'Games - Evilcome';
	
	view.query('upcomingMeetup',
		Game.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
	, 'talks[who]');
	
	view.query('pastGames',
		Game.model.find()
			.sort('-publishedAt'));
	
	view.render('site/games');
	
}
