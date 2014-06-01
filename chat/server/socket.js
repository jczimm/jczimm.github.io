var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

var users = 0;

MainServer.on('connection',function(ws){
	users++;
	console.log('join');
	ws.on('message',function(message){
		message = parseMessage(message);
		console.log(message);
		MainServer.broadcast(message);
	});
});

MainServer.on('disconnect',function(ws){
	users--;
});

function parseMessage(message){
	message = JSON.parse(message);
	switch(message.type){
		case 'message':
			message.msg = markdown.toHTML(message.msg);
			break;
		case 'requestUsers':
			message.msg = users;
			message.type = "usersRequest";
			break;
	}
	return JSON.stringify(message);
}

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}