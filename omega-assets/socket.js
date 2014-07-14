var pusher = new Pusher('6bd9ea172357cea30784');
var channel = pusher.subscribe('leaderboard');
channel.bind('new_highscore', function (data) {
    console.log(data);
    // make some ajax call to trigger an event
});
