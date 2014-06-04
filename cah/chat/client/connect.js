function Connection(ip,port){
	this.ip = ip || 'localhost';
	this.port = port;
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

var Main = new Connection(IP,'42069'),
	USERNAME;
do {
	USERNAME = prompt("choose a username");
} while(USERNAME === "");

initDisplay();
$(window.parent).append("<div id='game'></div>");

var users;

/*waitEnd,
	wait = setInterval(function(){
		try {
			transmit("test connection");
			waitEnd = true;
		}
		catch(e) {
			// not connected
		}
		if(waitEnd) clearInterval(wait);
	});*/

var checkConnection = setInterval(function(){
	$("#submit-button").css(
	{
		"background-color": statusColor(),
		"cursor": "default"
	});
	if(Main.socket.readyState>=1) $("#submit-button").css(
	{
		"background-color": statusColor(),
		"cursor": Main.socket.readyState === 1 ? "pointer" : "cursor"
	});
},100);

requestUsers();

/*Main.socket.onclose = function(){
	sendMsgOfType(USERNAME, "sendLostUser");
}*/