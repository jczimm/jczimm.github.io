var uri = 'ws://undrgnd.jczimm.com';

var leaderboardServer = new WebSocket(uri),
    waiting;

leaderboardServer.onopen = function() {
    if(waiting) clearInterval(waiting);
    console.log('.: Connected to the leaderboard server :.');
    fetchHighscores();
    $("#lb_connect").hide();
    $("#lb_error").hide();
    $("#show_leaderboard").show();
};

leaderboardServer.onclose = function() {
    console.log('`: Disconnected from the leaderboard server :`');
    $("#show_leaderboard").hide();
    $("#lb_connect").hide();
    $("#lb_error").show();
    waiting = setInterval(function(){
        leaderboardServer = new WebSocket(uri);
    }, 5000);
};

leaderboardServer.onerror = function(e) {
    $("#show_leaderboard").hide();
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
