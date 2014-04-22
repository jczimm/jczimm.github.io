$(function(){
  var ytplayer;

  function onYouTubePlayerReady(playerId) {
      ytplayer = document.getElementById("myytplayer");
      checkBuffer();
  }
  
  function checkBuffer(){
      if(ytplayer.getVideoBytesLoaded() == ytplayer.getVideoBytesTotal()){
          alert('Buffer Complete!');
      }else{
          var t = setTimeout(function(){
              Editor.split();
          },1000);
      }
  }
});
