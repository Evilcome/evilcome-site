var keystone = require('keystone'),
	Game = keystone.list('Game');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'game';
	locals.page.title = 'Game - Evilcome';


	// LOAD the Game

	view.on('init', function(next) {

		Game.model.findOne()
			.where('key', req.params.game)
			.exec(function(err, game) {
				
				if (err) return res.err(err);
				if (!game) return res.notfound('Post not found');
				
				locals.game = game;
				next();
			});
	});
	
	view.render('site/game');
}
