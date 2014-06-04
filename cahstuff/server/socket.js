var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:6969});

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

MainServer.on('connection',function(ws){
	ws.on('message',function(message){
		message = parseMessage(message);
		MainServer.broadcast(message);
	});
	ws.on('close', function(){
		
	});
});

function parseMessage(message){
	message = JSON.parse(message);
	/*switch(message.type){
		case 'thoseOnlineAre':
			users = message.msg.split(specialChar);
			break;
	}*/
	return JSON.stringify(message);
}
MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}