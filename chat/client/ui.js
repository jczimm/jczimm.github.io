$(document).ready(function(){
	$("#submit").click(submit);
	$("#msg-box").keypress(function(e){ if(e.keyCode === 13) submit(); });
});

var $statusImage = function(){
	var src = "img/"+["connecting.gif","","","closed.png"][Main.socket.readyState];
	return $("<img src='"+src+"' id='status-indicator' />");
}