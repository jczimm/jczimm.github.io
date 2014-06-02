Object.defineProperty(Array.prototype,"remove",{enumerable:false,value:function(e){var t=0;for(i=0;i<this.length;i++){if(this[i]===e){this.splice(i,1);t++;i--}}return t}});

var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

var users = [], sendUsersInterval;

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

MainServer.on('connection',function(ws){
	get("JoinedUser");
	sendUsersInterval = setInterval(sendUsers,500);
	ws.on('message',function(message){
		message = parseMessage(message);
		console.log(message);
		MainServer.broadcast(message);
	});
	ws.on('close', function(){
		console.log('leave, users: '+users.join(specialChar));
	});
	console.log('join, users: '+users.join(specialChar));
});

function parseMessage(message){
	message = JSON.parse(message);
	switch(message.type){
		case 'message':
			message.msg = markdown.toHTML(message.msg);
			message.user = markdown.toHTML(message.user);
			message.time = message.time.match("[0-9]*-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}..*");
			break;
		case 'requestUsers':
			message.msg = users.join(specialChar);
			message.type = "sendUsers";
			break;
		case 'sendJoinedUser':
			users.push(message.msg);
			break;
		case 'sendLostUser':
			users.remove(message.msg);
			break;
	}
	return JSON.stringify(message);
}

function sendUsers(){
	MainServer.broadcast(JSON.stringify(
		{"msg":users.join(specialChar),"time":new Date(),"type":"sendUsers"}
	));
}

function get(type){
	MainServer.broadcast(JSON.stringify(
		{"time":new Date(),"type":"get"+type}
	));
}

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}