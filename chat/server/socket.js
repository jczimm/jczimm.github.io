Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        var removeCounter = 0;

        for (i = 0; i < this.length; i++) {
            if (this[i] === item) {
                this.splice(i, 1);
                removeCounter++;
                i--;
            }
        }

        return removeCounter;
    }
});

var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:8888}),
	markdown = require('markdown').markdown;

var users = [], sendUsersInterval;

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

MainServer.on('connection',function(ws){
	get("JoinedUser");
	sendUsersInterval = setInterval(sendUsers,500);
	console.log('join, '+users+" users");
	ws.on('message',function(message){
		message = parseMessage(message);
		console.log(message);
		MainServer.broadcast(message);
	});
	ws.on('close', function(){
		//get("LostUser");
	});
});

function parseMessage(message){
	message = JSON.parse(message);
	switch(message.type){
		case 'message':
			message.msg = markdown.toHTML(message.msg);
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