var leaderboardServer = new WebSocket('ws://underground.jczimm.com');

leaderboardServer.onopen = function(){
	console.log('.: Connected to the leaderboard server :.');
	setInterval(function(){
		ws.send("keepalive");
    }, 30000);
};

leaderboardServer.onclose = function(){
	console.log('.: Disconnected from the leaderboard server :.');
};

leaderboardServer.onerror = function(e){
	throw e;
};

function sendUserHighscore(user, score){
	leaderboardServer = new WebSocket('ws://underground.jczimm.com');
	leaderboardServer.onopen = function(){
		leaderboardServer.send(JSON.stringify({type:"updateUserHighscore", user: user, score: score}));
	}
}