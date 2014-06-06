Object.defineProperty(Array.prototype,"remove",{enumerable:false,value:function(e){var t=0;for(i=0;i<this.length;i++){if(this[i]===e){this.splice(i,1);t++;i--}}return t}});
var diff=function(a,b){return a.filter(function(i){return b.indexOf(i)<0;});};

var WebSocketServer = require('ws').Server,
	MainServer = new WebSocketServer({port:42069});

var sendUsersInterval;
var timeout = 3000;

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

MainServer.on('connection',function(ws){
	console.log("["+Number(new Date())+"]\t"+ws._socket.remoteAddress+" joined");
	ws.on('message',function(message){
		
	});
	ws.on('close', function(){
		
	});
});

function parseMessage(message){
	message = JSON.parse(message);
	message.time = new Date();
	/*switch(message.type){
		//
	}*/
	return JSON.stringify(message);
}

MainServer.broadcast = function(data){
	for(var i in this.clients){
		this.clients[i].send(data);
	}
}