var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

var users = 0;

MainServer.on('connection',function(ws){
	console.log('join');
	ws.on('message',function(message){
		message = JSON.parse(message);
		if(message.type === 'message') message.msg = markdown.toHTML(message.msg);
		else if(message.type === 'requestUsers') message.msg = users, message.type = "usersRequest";
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