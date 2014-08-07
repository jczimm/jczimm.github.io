var leaderboardServer = new WebSocket('ws://underground.jczimm.com');

leaderboardServer.onopen = function() {
    console.log('.: Connected to the leaderboard server :.');
    fetchHighscores();
    $("#lb_connect").hide();
    $("#show_leaderboard").show();
};

leaderboardServer.onclose = function() {
    console.log('`: Disconnected from the leaderboard server :`');
};

leaderboardServer.onerror = function(e) {
    $("#lb_connect").hide();
    $("#lb_error").show();
};

var leaderboard = [];
leaderboardServer.onmessage = function(message) {
    if (message.data !== "ping"){
        leaderboard = JSON.parse(message.data);
        updateLeaderboard();
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
