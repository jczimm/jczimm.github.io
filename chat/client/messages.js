function Message(user,msg,type){
	this.user = user;
	this.msg = msg;
	this.time = undefined;
	this.type = type || "message";
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

function transmit(m){
	if(m === "") return;
	var msg = new Message(USERNAME, m, "transmission");
	Main.socket.send(JSON.stringify(msg));
}

function sendMsgOfType(m,t){
	if(m === "") return;
	var msg = new Message(USERNAME, m, t);
	Main.socket.send(JSON.stringify(msg));
}

function requestUsers(){
	var msg = new Message(USERNAME, "", "requestUsers");
	Main.socket.send(JSON.stringify(msg));
}

var theNewGuy = true;

// create an empty message to init last message (`lm`)
var lm = new Message();
function initDisplay(){
	Main.socket.onmessage = function(m){
		var data = JSON.parse(m.data);
		switch(data.type){
			case "message":
				var userToDisplay = lm.user === data.user ? "" : data.user === USERNAME ? "<b>me</b>" : data.user;
				var isMineClass = userToDisplay === USERNAME ? " me" : "";
				$("#messages").prepend("<tr class='line"+isMineClass+"'><td class='user'>"+userToDisplay+"</td><td class='msg'>"+data.msg+"</td><td class='time' data-ot='"+data.time+"' data-ot-delay='0.1'></td></tr>");
				updateDates();
				lm = data;
				break;
			case "transmission":
				switch(data.msg){
					case "addNewUser":
						Main.socket.send(JSON.stringify(new Message(USERNAME, "userJoin", undefined, "transmission")));
						break;
					case "userJoin":
						if(theNewGuy) users.push(data.user), theNewGuy = false;
						break;
					case "userLeave":
						users.remove(data.user);
						break;
				}
				break;
			case "sendUsers":
				users = data.msg;
				break;
			case "getJoinedUser":
				if(theNewGuy) sendMsgOfType(USERNAME, "sendJoinedUser"), theNewGuy = false;
				break;
			case "areYouHere":
				Main.socket.send(JSON.stringify(new Message(USERNAME, undefined, "imHere")));
				break;
		}
	}
}

var updateDatesInterval = setInterval(updateDates,6e4);
function updateDates(){
	var $objs = $(".line .time");
	for(i=0; i<$objs.length; i++){
		$($objs[i]).text(moment($($objs[i]).data("ot")).fromNow());
	}
}