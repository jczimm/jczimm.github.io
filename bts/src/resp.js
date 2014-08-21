$(function() {
	var theirVideo = document.getElementById("their-video");
	$(window).resize(function(){
		$("#loading").height(theirVideo.getClientRects()[0].height);
	});
});