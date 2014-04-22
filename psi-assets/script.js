$(document).ready(function(){
  $("#player").attr("width",$(window).width());
  $("#player").attr("height",$(window).height());
  $(document).resize(function(){
    $("#player").attr("width",$(window).width());
    $("#player").attr("height",$(window).height());
  });
});
