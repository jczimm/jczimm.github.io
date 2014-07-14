var pusher = new Pusher('6bd9ea172357cea30784');
var channel = pusher.subscribe('leaderboard');
channel.bind('new_highscore', function (data) {
    var data = JSON.parse(data);
});
