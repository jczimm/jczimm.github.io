function Connection(ip,port){
	this.ip = ip || 'localhost';
	this.port = port;
	this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	this.newConnection = function(){
		this.socket = new WebSocket('ws://' + this.ip + ':' + this.port);
	}
	this.socket.onmessage = function(m){
		console.log(m.data);
	}
}

var specialChar = String.fromCharCode(parseInt("420blayzeit",36));

var IP, ipRegexp = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
if(location.hash.replace("#","").match(ipRegexp)) IP = location.hash.replace("#","");
else {
	IP = prompt("connect to ip");
	while(!IP.match(ipRegexp)) IP = prompt("invalid ip");
}

var Main = new Connection(IP,"42069"),
	USERNAME,
	users = [];

Main.socket.onopen = function(){ requestUsers(); }

function promptUsername(){
	do {
		USERNAME = prompt("choose a username");
	} while(USERNAME === "" || users.contains(USERNAME));
}

initDisplay();

var checkConnection = setInterval(function(){
	$("#submit-button").css(
	{
		"background-color": statusColor(),
		"cursor": "default"
	});
	if(Main.socket.readyState>=1) $("#submit-button").css(
	{
		"background-color": statusColor(),
		"cursor": Main.socket.readyState === 1 ? "pointer" : "cursor"
	});
},100);

javascript:$("head").append('<style>@import url(//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic);*{font-family:"Source Sans Pro", sans-serif;}.game_black_card_wrapper > span,.game_white_card_wrapper > span,.game_animate_cards,.logo{display:none;}#current_timer{display:inline;}.game_left_side{padding-top:0;}.card,.scorecard{-webkit-transition:background-color 300ms ease-out 500ms;-moz-transition:background-color 300ms ease-out 500ms;-o-transition:background-color 300ms ease-out 500ms;transition:background-color 300ms ease-out 500ms;}.card_metadata{font-style:italic;}.game_menu_bar{display:none;}</style>');