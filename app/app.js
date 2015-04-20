module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose"),
		multer = require("multer"),
		fs = require("fs"),
		app = express();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	console.log(config.httpServer.wwwRoot);

	app.use(express.static(config.httpServer.wwwRoot));

	app.use("/api", bodyParser.json());
	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));

	var fileSchema = mongoose.Schema({
    fileName: String,
    data: Buffer
  });

  var FileModel = mongoose.model("file", fileSchema);

  app.use(multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		},
    /*onFileUploadComplete: function(file, req, res) {
      console.log(file.originalname + ' uploaded to ' + file.path);
      var media = new FileModel();
      fs.readFile(file.path, function(err, data){
        media.data = data;
        media.save(function (err, media) {
          if (err) throw err;

          console.error('saved img to mongo');
        });
      });
      return;
    }*/

	}));

	app.post("/uploads", function(req, res) {

    console.dir(req);

		res.json({
			msg: "received"
		});

	});

	app.use("/api", require("./routers/donations.js")(config));
	app.use("/api", require("./routers/contacts.js")(config));
	app.use("/api", require("./routers/contents.js")(config));
	app.use("/api", require("./routers/gallery.js")(config));

	return app;

};
