evilcome-site
=============

Source code of evilcome.com, based on [JedWatson/sydjs-site](https://github.com/JedWatson/sydjs-site).

## Getting Started

To run the Evilcome site locally, there are a few things to set up.

Because we have some private keys for our MongoDB, Cloudinary and Mandrill accounts, you'll need to set up your own equivalents before the site will run properly.

### Install Node.js and MongoDB

You'll need node 0.10.x and npm 1.3.x installed to run Evilcome. The easiest way is to download the installers from [nodejs.org](http://nodejs.org).

You'll also need MongoDB 2.4.x - if you're on a Mac, the easiest way is to install [homebrew](http://brew.sh) and then run `brew install mongo`.

If you're on a Mac you'll also need Xcode and the Command Line Tools installed or the build process won't work.

### Setting up your copy of Evilcome

Get a local copy of the site by cloning this repository, or fork it to work on your own copy.

Then run `npm install` to download the dependencies.

Before you continue, create a file called `.env` in the root folder of the project (this will be ignored by git). This file is used to emulate the environment config of our production server, in development. Any `key=value` settings you put in there (one on each line) will be set as environment variables in `process.env`.

The only line you **need** to add to your `.env` file is a valid `CLOUDINARY_URL`. To get one of these, sign up for a free account at [Cloudinary](http://cloudinary.com) and paste the environment variable if gives you into your `.env` file. It should look something like this:

	CLOUDINARY_URL=cloudinary://12345:abcde@cloudname
	
### .env file detail

	NODE_ENV = production
	PORT = 80

	CLOUDINARY_URL=cloudinary://12345:abcde@cloudname

	GITHUB_CLIENT_ID = your_github_client_id_here
	GITHUB_CLIENT_SECRET = your_github_client_secret_here
	GITHUB_CALLBACK_URL = your_github_oauth2_url

	COOKIE_SECRET = your_cookie_secret

	GA_PROPERTY = your_google_analytics_property
	GA_DOMAIN = your_google_analytics_domain

### Running Evilcome

Once you've set up your configuration, run `node keystone` to start the server.

By default, [Keystone](http://keystonejs.com) will connect to a new local MongoDB database on your localhost called `evilcome`, and create a new Admin user that you can use to log in with using the email address `user@keystonejs.com` and the password `admin`.

If you want to run against a different server or database, add a line to your `.env` file to set the `MONGO_URI` environment variable, and restart the site.

When it's all up and running, you should see the message `Evilcome is ready on port 3000` and you'll be able to browse the site on [localhost:3000](http://localhost:3000).