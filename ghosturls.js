var urls = [
  
  ["/cdn", "http://cdn.jczimm.com"],
  ["/blog", "http://blog.jczimm.com"]
  
];

var redirect = false;

urls.forEach(function(pair){
  if(location.href.substr(17) === pair[0]){
    location.href = pair[1];
    redirect = true;
  }
});

if(!redirect) document.getElementsByTagName("span")[0].innerHTML = "Error 404";
