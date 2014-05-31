function Message(user,msg,time){
	this.user = user;
	this.msg = msg;
	this.time = time || new Date();
}

function send(u,m){
	Main.socket.send(JSON.stringify(new Message(USERNAME, m)));
}

function initDisplay(){
	Main.socket.onmessage = function(m){
		var data = JSON.parse(m.data);
		$("#messages").prepend("<tr class='line'><td class='user'>"+ data.user +"</td><td class='msg'>" + data.msg + "</td><td class='time'>" + data.time +"</td></tr>");
	}
}