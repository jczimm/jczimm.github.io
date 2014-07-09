var gmStatus = false,
	gmStatusInterval;

$(document).ready(function(){
	gmStatusInterval = setInterval(checkGmStatus,500);
});

function checkGmStatus(){
	$("body").append('\
			<img style="display:none;"\
			onload="setGmStatus(true);$(this).remove();"\
			onerror="setGmStatus(false);$(this).remove();"\
			src="https://mail.google.com/mail/photos/static/AD34hIhNx1pdsCxEpo6LavSR8dYSmSi0KTM1pGxAjRio47pofmE9RH7bxPwelO8tlvpX3sbYkNfXT7HDAZJM_uf5qU2cvDJzlAWxu7-jaBPbDXAjVL8YGpI"\
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