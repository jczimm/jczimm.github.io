function Message(msg, time){
	this.msg = msg;
	this.time = time;
}

function send(m){
	Main.socket.send(JSON.stringify(new Message(m, new Date())));
}

$("#submit").onclick(function(){ send($("#msg-box").val()) });

Main.socket.onmessage = function(m){
	var data = JSON.parse(m.data);
	$("#messages").prepend("<tr class='line'><td class='msg'>" + data.msg + "</td><td class='time'>" + data.time +"</td></tr>");
}