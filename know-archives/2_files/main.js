var unread = 0;

var pusher = new Pusher("50ed18dd967b455393ed");
var subredditChannel = pusher.subscribe("todayilearned");

subredditChannel.bind("new-listing", function(listing) {
    process(listing);
});

var last;

function process(listing) {
    var title = listing.title.trim();

    var newTitle = title.replace(/^(til|today i learned) (that )?/gi, "");
    if (title === newTitle) // make sure it matches ^
        return;

    if (/^(about|why|of)/gi.test(newTitle)) // make sure the stripped title can be understood
        return;

    title = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

    listing.title = title;

    if (window.state && window.state === "hidden") {
        unread++;
        updateFavicon(unread);
    }

    if ($(".waiting")[0])
        $(".waiting").remove();

    if (last && last.title) {
        $("<a/>")
            .attr('href', last.url)
            .text(last.title)
            .prependTo("#more");
    }

    $("blockquote")
        .find('a')
        .attr('href', listing.url)
        .text(title);

    last = listing;
}
