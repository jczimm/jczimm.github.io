function Message(user,msg,time){
	this.user = user;
	this.msg = msg;
	this.time = time || new Date();
}

var msgs = [];
function send(u,m){
	var msg = new Message(USERNAME, m);
	Main.socket.send(JSON.stringify(msg));
	msgs.push(msg);
}

// create an empty message to init `lm`
var lm = new Message();
function initDisplay(){
	Main.socket.onmessage = function(m){
		var data = JSON.parse(m.data);
		var userToDisplay = lm.user === data.user ? "" : data.user;
		$("#messages").prepend("<tr class='line'><td class='user'>"+UserToDisplay+"</td><td class='msg'>"+data.msg+"</td><td class='time'>"+data.time+"</td></tr>");
		lm = data;
	}
}