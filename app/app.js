module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		mongoose = require("mongoose"),
		session = require('express-session'),
		passport = require("passport"),
		crypto = require("crypto"),
		app = express();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	passport.serializeUser(function(user, done) {
  	done(null, user);
	});

	passport.deserializeUser(function(user, done) {
  	done(null, user);
	});

	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret : "asecret"
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	console.log(config.httpServer.wwwRoot);

	app.use(express.static(config.httpServer.wwwRoot));

	app.use("/api", bodyParser.json());
	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));
	
	//app.use("/api", require("./routers/transactions.js")(config));
	app.use("/api", require("./routers/donations.js")(config));
	app.use("/api", require("./routers/contacts.js")(config));
	app.use("/api", require("./routers/contents.js")(config));
 	app.use("/api", require("./routers/gallery.js")(config));
 	app.use("/api", require("./routers/authenticate.js")(config));

	return app;
};
