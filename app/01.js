var
  fs = require("fs"),
  mongo = require("mongodb"),
  image = fs.readFileSync("01.png");

  mongo.connect("mmongodb://localhost:27017", function(err, mongoConnection) {
    
  })
