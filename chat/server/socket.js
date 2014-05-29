var WebSocketServer = require('ws').Server, MainServer = new WebSocketServer({port:8888});

MainServer.on('connection',function(ws){
	ws.on('message',function(message){
		console.log(message);
		GameServer.broadcast(message);
	});
});

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}