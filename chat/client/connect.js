function Connection(ip,port){
	this.ip = ip ? ip : 'localhost';
	this.port = port ? port : '8888';
	this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	this.newConnection = function(){
		this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	}
	this.socket.onmessage = function(m){
		console.log(m.data);
	}
}

function send(m){
	Main.socket.send( m );
}

var Main = new Connection('108.49.225.239','8888')