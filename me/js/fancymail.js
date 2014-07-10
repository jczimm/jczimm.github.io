var gmStatus = false,
	gmStatusInterval;

$(document).ready(function(){
	gmStatusInterval = setInterval(checkGmStatus,300000);
	checkGmStatus();
});

function checkGmStatus(){
	$("body").append('\
		<img style="display:none;"\
			onload="setGmStatus(true);$(this).remove();"\
			onerror="setGmStatus(false);$(this).remove();"\
			src="https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1"\
		/>\
	');
}

function setGmStatus(status){
	gmStatus = status;
	var $l = $("li:eq(-1) > a"),
		href;
	if(status) href = "https://mail.google.com/mail/?view=cm&fs=1&to=jczimm@jczimm.com";
	else href = "mailto:jczimm@jczimm.com";
	$l.attr("href",href);
}