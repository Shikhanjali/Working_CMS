window.addEventListener("DOMContentLoaded", function() {

	var accountElement = document.getElementById("auth");
	var user = document.getElementById("user");
	var pwd = document.getElementById("pwd");

	accountElement.addEventListener("click", function() {
		user = user.value;
		pwd = pwd.value;
		console.log(user);
		console.log(pwd);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var o = JSON.parse(xhr.responseText)
				console.log(o);
			}
		};
		xhr.open("POST", "/api/accounts/authenticate");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({
			"userName": user,
			"password": pwd
		}));
	});

});
