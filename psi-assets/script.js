$(function(){
  $("#player").tubeplayer();
  var $playerData = $("#player").tubeplayer("data");

  while($playerData.bytesLoaded !== $playerData.bytesTotal){}
  alert("done!");
});
