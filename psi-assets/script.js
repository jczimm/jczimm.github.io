$(document).ready(function(){
  var video = document.getElementById("player");
  video.pause();
  
  $("#player").attr("width",$(window).width());
  $("#player").attr("height",$(window).height());
  $(document).resize(function(){
    $("#player").attr("width",$(window).width());
    $("#player").attr("height",$(window).height());
  });
  
  var playing = false, paused = true;
  
  $(document).keypress(function(e){
    switch(e.keyCode){
      case 32: // space
        if (playing) {
          if (paused) {
            $("#pause-icon").fadeOut();
            paused = false;
            video.play();
          } else {
            $("#pause-icon").fadeIn(400, function () {
              $("#pause-icon").finish();
            });
            paused = true;
            video.pause();
          }
        }
        break;
      }
  });
});
