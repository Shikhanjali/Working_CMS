module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		contentsRouter = express.Router();

	var contentSchema = mongoose.Schema({
		contentTitle: String,
		dayModified: Number,
		monModified: String,
		yearModified: Number,
		category: String,
		author: String,
		content: String,
		route: String
	});

	var contentModel = mongoose.model("content", contentSchema);

	contentsRouter.route("/contents")
		.get(function(req, res) {

			contentModel.find({}, function(err, contents) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(contents);
			});

		});

	contentsRouter.route("/content")
		.post(function(req, res) {
			var t = new contentModel(req.body.content);
			t.save(function(err, content) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(content);
			});
		});

	contentsRouter.route("/content/:contentId")
		.get(function(req, res) {
			contentModel.findById(req.params.contentId,
				function(err, content) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(content);
				});
		})
		.put(function(req, res) {
			contentModel.findByIdAndUpdate(req.params.contentId,
				req.body.content,
				function(err, content) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(content);
				});
		})
		.delete(function(req, res) {
			contentModel.findByIdAndRemove(req.params.contentId,
				function(err, content) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(content);
				});
		});

	return contentsRouter;
};
