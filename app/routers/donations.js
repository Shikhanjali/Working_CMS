module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		donationsRouter = express.Router();

	/*mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);*/

	var donationSchema = mongoose.Schema({
		userName: String,
		userAddress: String,
		amount: Number,
		creditCardNumber: Number,
		paymentMethod: String,
		expirationMon: String,
		expirationYear: Number,
		cvc: Number,
		comments: String
	});

	var DonationModel = mongoose.model("donation", donationSchema);

	donationsRouter.route("/donations")
		.get(function(req, res) {

			DonationModel.find({}, function(err, donations) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(donations);
			});

		});

	donationsRouter.route("/donation")
		.post(function(req, res) {
			var t = new DonationModel(req.body.donation);
			t.save(function(err, donation) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(donation);
			});
		});

	donationsRouter.route("/donation/:donationId")
		.get(function(req, res) {
			DonationModel.findById(req.params.donationId,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		})
		.put(function(req, res) {
			DonationModel.findByIdAndUpdate(req.params.donationId,
				req.body.donation,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		})
		.delete(function(req, res) {
			DonationModel.findByIdAndRemove(req.params.donationId,
				function(err, donation) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(donation);
				});
		});

	return donationsRouter;
};
