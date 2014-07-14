var pusher = new Pusher('6bd9ea172357cea30784');
var channel = pusher.subscribe('leaderboard');
channel.bind('out', function (data) {
    console.log(data.message, data);
});
