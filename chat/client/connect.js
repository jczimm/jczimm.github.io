function Connection(ip,port){
	this.ip = ip || 'localhost';
	this.port = port || '8888';
	this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	this.newConnection = function(){
		this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	}
	this.socket.onmessage = function(m){
		console.log(m.data);
	}
}

var IP, ipRegexp = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
if(location.hash.replace("#","").match(ipRegexp)) IP = location.hash.replace("#","");
else {
	IP = prompt("connect to ip");
	while(!IP.match(ipRegexp)) IP = prompt("invalid ip");
}

var Main = new Connection(IP,'8888'),
	USERNAME;
do {
	USERNAME = prompt("choose a username");
} while(USERNAME === undefined);

initDisplay();

$("#submit-button").html($statusImage());
var users, waitEnd,
	wait = setInterval(function(){
		try {
			transmit("test connection");
			waitEnd = true;
		}
		catch(e) {
			// not connected
		}
		if(waitEnd) clearInterval(wait), $("#submit-button").html();
	});

requestUsers();

$(window).unload(function(){
	sendMsgOfType(USERNAME, "sendLostUser");
});