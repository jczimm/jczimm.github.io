var urls = [
  
  ["/cdn", "http://cdn.jczimm.com"],
  ["/blog", "http://blog.jczimm.com"]
  
];

urls.forEach(function(pair){
  if(location.href.substr(17) === pair[0])
    location.href = pair[1];
});
