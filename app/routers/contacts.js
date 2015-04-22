module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		contactsRouter = express.Router();

	var contactSchema = mongoose.Schema({
		fname: String,
		lname: String,
		email: String,
		phone: Number,
		contactComments: String,
		reason: String,
		contactOptions: String
	});

	var contactModel = mongoose.model("contact", contactSchema);

	contactsRouter.route("/contacts")
		.get(function(req, res) {

			contactModel.find({}, function(err, contacts) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(contacts);
			});

		});

	contactsRouter.route("/contact")
		.post(function(req, res) {
			var t = new contactModel(req.body.contact);
			t.save(function(err, contact) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(contact);
			});
		});

	contactsRouter.route("/contact/:contactId")
		.get(function(req, res) {
			contactModel.findById(req.params.contactId,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		})
		.put(function(req, res) {
			contactModel.findByIdAndUpdate(req.params.contactId,
				req.body.contact,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		})
		.delete(function(req, res) {
			contactModel.findByIdAndRemove(req.params.contactId,
				function(err, contact) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(contact);
				});
		});

	return contactsRouter;
};