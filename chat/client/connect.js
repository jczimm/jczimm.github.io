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

var USERNAME = prompt("choose a username"),
IP = prompt("connect to ip"),

Main = new Connection(IP,'8888');
initDisplay();