$(document).ready(function(){
	$("#submit").click(submit);
	$("#msg-box").keypress(function(e){ if(e.keyCode === 13 && Main.socket.readyState === 1) submit(); });
});

// removed until I can make the image properly fill `#submit-button`
/*var $statusImage = function(){
	var src = "img/"+["connecting.gif","","","closed.png"][Main.socket.readyState];
	return $("<img src='"+src+"' id='status-indicator' />");
}*/

var statusColor = function(){
	return "#"+["F1BC02","F8C7A6","","FA2828"][Main.socket.readyState];
}