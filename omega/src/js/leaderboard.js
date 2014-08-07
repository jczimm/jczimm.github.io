var leaderboardServer = new WebSocket('ws://underground.jczimm.com');

leaderboardServer.onopen = function() {
    console.log('.: Connected to the leaderboard server :.');
};

leaderboardServer.onclose = function() {
    console.log('`: Disconnected from the leaderboard server :`');
};

leaderboardServer.onerror = function(e) {
    throw "Exited with code " + e.readyState;
};

var leaderboard = [];
leaderboardServer.onmessage = function(message) {
    if (message.data !== "ping"){
        leaderboard = JSON.parse(message.data);
    }
}

function sendUserHighscore(user, score) {
    leaderboardServer.send(JSON.stringify({
        type: "updateUserHighscore",
        user: user,
        score: score
    }));
}

function fetchHighscores() {
    leaderboardServer.send(JSON.stringify({
        type: "fetchHighscores"
    }));
}
