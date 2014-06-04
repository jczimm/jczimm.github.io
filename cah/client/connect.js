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

var IP = '24.218.153.164';

var Main = new Connection(IP,'42069'),
	USERNAME;
do {
	USERNAME = prompt("choose a username");
} while(USERNAME === "");

var users, connectionStatus;

var checkConnection = setInterval(function(){
	connectionStatus = Main.socket.readyState;
},100);