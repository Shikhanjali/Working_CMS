module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		session = require('express-session'),
		passport = require("passport"),
		crypto = require("crypto"),
		accountsRouter = express.Router();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	var accountsSchema = mongoose.Schema({
		userName: String,
		password: String
	});

	var passwordSalt = "password salt";
	function sha1(value) {
		return crypto.createHash("sha1").update(value.toString()).digest("hex");
	}

	var accountsModel = mongoose.model("accounts", accountsSchema);

	accountsRouter.route("/accounts/authenticate")
		.post(function(req, res, next) {

		console.log(req.body.userName);
		console.log(req.body.password);

		accountsModel.find({userName: req.body.userName, password: sha1(req.body.password + passwordSalt)}, function(err, accounts) {

			if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
					}
			req.login(accounts, function(err) {
				if (err) {
					console.dir(err);
					res.status(500).json(err);
					return;
				}
				res.json(accounts);
			});			
		});
		
		console.log(sha1(req.body.password + passwordSalt));

	});

	return accountsRouter;

};
