var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

MainServer.on('connection',function(ws){
	MainServer.broadcast(JSON.stringify({
		user: "SERVER",
		msg: "addNewUser",
		time: undefined,
		type: "transmission"
	}));
	ws.on('message',function(message){
		message = JSON.parse(message);
		if(message.type === "message") message.msg = markdown.toHTML(message.msg);
		message = JSON.stringify(message);
		console.log(message);
		MainServer.broadcast(message);
	});
});

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}