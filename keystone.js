// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	pkg = require('./package.json');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Evilcome',
	'brand': 'Evilcome',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',

	'views': 'templates/views',
	'view engine': 'jade',
	'view cache': process.env.NODE_ENV === 'production' ? true : false,
	
	'auto update': true,
	'mongo': process.env.MONGO_URI || 'mongodb://localhost/' + pkg.name,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'evilcome.com',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'basedir': __dirname

});

// Load your project's Models

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	moment: require('moment'),
	env: keystone.get('env'),
	utils: keystone.utils,
	plural: keystone.utils.plural,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain')
});

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories', 'post-comments'],
	'users': 'users',
	'games': 'games',
	'links': ['links', 'link-tags', 'link-comments']
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
