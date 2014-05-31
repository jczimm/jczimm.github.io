var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

MainServer.on('connection',function(ws){
	ws.on('message',function(message){
		message = JSON.parse(message);
		message.msg = markdown.toHTML(message.msg);
		message = JSON.toString(message);
		console.log(message);
		MainServer.broadcast(message);
	});
});

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}