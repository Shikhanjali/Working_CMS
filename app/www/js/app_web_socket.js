/*var ws = new WebSocket("ws://localhost:8080");
console.log("app_web_socket");
ws.addEventListener("open", function() {
	ws.send(JSON.stringify({
		messageType: "error",
		errorMessage: "error message"
	}));
});

ws.addEventListener("message", function(msg) {
	console.log("message received: " + msg.data);
	console.dir(JSON.parse(msg.data));
});

ws.addEventListener("error", function(err) {
	console.log("err received: " + JSON.stringify(err));
});*/

function myClient(url) {
	var p = new Promise(function(resolve, reject) {
		var w = new WebSocket();
		w.addEventListener("open", function() {
			resolve();
		});
		w.addEventListener("error", function(err) {
			reject();
		});
	});

	p.then(function(message){
		console.log("message received: " + message);
		console.dir(JSON.parse(message));
	}, function(message){
		console.log("err received: " + JSON.stringify(message));
	});

	var ws = new myClient("ws://localhost:8090");
	ws.error("Testing message");
}
