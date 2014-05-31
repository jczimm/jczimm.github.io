function Message(user,msg,time){
	this.user = user;
	this.msg = msg;
	this.time = time || new Date();
}

function submit(){
	send($("#msg-box").val()), $("#msg-box").val("");
}

var msgs = [];
function send(m){
	if(m === "") return;
	var msg = new Message(USERNAME, m);
	Main.socket.send(JSON.stringify(msg));
	msgs.push(msg);
}

// create an empty message to init `lm`
var lm = new Message();
function initDisplay(){
	Main.socket.onmessage = function(m){
		var data = JSON.parse(m.data);
		var userToDisplay = lm.user === data.user ? "" : data.user === USERNAME ? "<b>me</b>" : data.user;
		$("#messages").prepend("<tr class='line'><td class='user'>"+userToDisplay+"</td><td class='msg'>"+data.msg+"</td><td class='time' alt='"+data.time+"'></td></tr>");
		updateDates();
		lm = data;
	}
}

var updateDatesInterval = setInterval(updateDates,6e4);
function updateDates(){
	var $objs = $(".line .time");
	for(i=0; i<$objs.length; i++){
		$($objs[i]).text(moment($objs[i].attr("alt")).fromNow());
	}
}