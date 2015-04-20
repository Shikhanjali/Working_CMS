module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose"),
		multer = require("multer"),
		app = express();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	console.log(config.httpServer.wwwRoot);

	app.use(express.static(config.httpServer.wwwRoot));

	app.use("/api", bodyParser.json());
	app.use("/api", require("./routers/donations.js")(config));
	app.use("/api", require("./routers/contacts.js")(config));
	app.use("/api", require("./routers/contents.js")(config));

	return app;

};
