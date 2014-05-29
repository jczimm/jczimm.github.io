var WebSocketServer = require('ws').Server, GameServer = new WebSocketServer({port:8888});

GameServer.on('connection',function(ws){
	ws.on('message',function(message){
		console.log(message);
		GameServer.broadcast(message);
	});
});

GameServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}