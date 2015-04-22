var crypto = require("crypto");

function test(value) {
	console.log(crypto.createHash("sha1").update(value.toString()).digest("hex"));
}

test("test123");