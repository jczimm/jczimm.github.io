Object.defineProperty(Array.prototype,"remove",{enumerable:false,value:function(e){var t=0;for(i=0;i<this.length;i++){if(this[i]===e){this.splice(i,1);t++;i--}}return t}});
var diff=function(a,b){return a.filter(function(i){return b.indexOf(i)<0;});};

var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:42069}),
	markdown = require('markdown').markdown,
	$ = require('jquery');

var users = [], oldUsers = [], sendUsersInterval, checkOnUsersInterval;

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

MainServer.on('connection',function(ws){
	get("JoinedUser");
	sendUsersInterval = setInterval(sendUsers,500);
	//checkOnUsersInterval = setInterval(function(ws){console.log(ws._socket.address(), ws._socket.remoteAddress, ws._socket.remotePort)},500);
	console.log("["+Number(new Date())+"]\t"+ws._socket.remoteAddress+" joined");
	ws.on('message',function(message){
		message = parseMessage(message);
		MainServer.broadcast(message);
	});
	ws.on('close', function(){
		oldUsers = users, users = [];
		whosHere();
		console.log(diff(oldUsers, users)+" left");
	});
	//console.log('join');
});

function parseMessage(message){
	message = JSON.parse(message);
	message.time = new Date();
	switch(message.type){
		case 'message':
			var rawMessage = message.msg, rawUser = message.user;
			message.msg = markdown.toHTML(message.msg);
			message.user = markdown.toHTML(message.user);
			//message.time = message.time.match("[0-9]*-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}..*");
			console.log("["+Number(message.time)+"]\t"+rawUser+": "+rawMessage);
			break;
		case 'requestUsers':
			message.msg = users.join(specialChar);
			message.type = 'sendUsers';
			console.log("["+Number(message.time)+"]\trequestUsers -> sendUsers, from "+message.user);
			break;
		case 'sendJoinedUser':
			users.push(message.msg);
			console.log("["+Number(message.time)+"]\t("+message.user+" joined)");
			break;
		case 'sendLostUser':
			users.remove(message.msg);
			console.log("["+Number(message.time)+"]\tsendLostUser, from "+message.user);
			break;
		case 'imHere':
			users.push(message.user);
			break;
	}
	return JSON.stringify(message);
}

function sendUsers(){
	MainServer.broadcast(JSON.stringify(
		{"msg":users.join(specialChar),"time":new Date(),"type":"sendUsers"}
	));
}

function checkOnUsers(ws){
	console.log(ws._socket.address(), ws._socket.remoteAddress, ws._socket.remotePort);
}

function get(type){
	MainServer.broadcast(JSON.stringify(
		{"time":new Date(),"type":"get"+type}
	));
}

function whosHere(){
	MainServer.broadcast(JSON.stringify(
		{"time":new Date(),"type":"areYouHere"}
	));
}

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}