var leaderboardServer = new WebSocket('ws://underground.jczimm.com');

leaderboardServer.onopen = function(){
	console.log('.: Connected to the leaderboard server :.');
};

leaderboardServer.onclose = function(){
	console.log('.: Disconnected from the leaderboard server :.');
};

leaderboardServer.onerror = function(e){
	throw e;
};

function sendUserHighscore(user, score){
	leaderboardServer.send(JSON.stringify({type:"updateUserHighscore", user: user, score: score}));
}