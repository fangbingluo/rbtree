var to = "world";
var msg = "Hello " + to;

function hi() {
	console.log(msg);
}

function hiTo(name) {
	console.log("Hello " + name);
}

module.exports = {
	hi: hi,
	hiTo: hiTo,
	msg: msg
}
