$(document).ready(function(){
	$("#submit").click(submit);
	$("#msg-box").keypress(function(e){ if(e.keyCode === 13) submit(); });
});