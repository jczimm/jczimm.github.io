navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var key = 'c8rpfwhlmfs9k9';

var hashids = new Hashids(+new Date() + "", 0, "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789"),
    userID = hashids.encrypt(1, 2, 3);

var stunServer, turnServer, turnServerCred;
turnserversDotComAPI.iceServers(function(data) {
    stunServer = data[0].url;
    turnServer = data[1].url, turnServerCred = data[1].credential;
});

// PeerJS object
var peer = new Peer(userID, {
    key: key,
    config: {'iceServers': [
        { url: stunServer },
        { url: turnServer, credential: turnServerCred }
    ]}
});

peer.on('open', function() {
    $('.my-id').text(peer.id);
});

// Receiving a call
peer.on('call', function(call) {
    call.answer(window.localStream);
    oncall(call);
});

peer.on('error', function(err) {
    console.log(err.message);

    switch (err.type) {
        case "peer-unavailable":
            alert('unable to connect');
            break;
    }

    offloading();
    promptCall();
});

// Handlers setup
$(function() {
    $("video").on('contextmenu', function(e) {
        return false;
    });

    $('#make-call-button').click(function() {
        var who = $('#callto-id').val();
        if (who === userID) {
            alert("cannot call self!");
            $("#callto-id").val("").focus();
        } else if (who !== "") {
            var call = peer.call(who, window.localStream);
            oncall(call);
        }
    });

    $('.end-call').click(function() {
        window.existingCall.close();
        setTheirVideo('');
        promptCall();
    });

    // Retry if getUserMedia fails
    $('#ask-allow-retry').click(function() {
        $('#ask-allow-error').hide();
        getStream();
    });

    // Get things started
    getStream();
});

function getStream() {
    // Get audio/video stream
    navigator.getUserMedia({
        audio: true,
        video: true
    }, function(stream) {
        // Set your video displays
        $('#my-video').prop('src', URL.createObjectURL(stream));

        window.localStream = stream;
        promptCall();
    }, function() {
        $('#ask-allow-error').show();
    });
}

function promptCall() {
    $('#ask-allow, #calling, #call').hide();
    $('#make-call').show();
}

function oncall(call) {
    onloading();
    // Hang up on an existing call if present
    if (window.existingCall)
        window.existingCall.close();

    // Wait for stream on the call, then set peer video display
    call.on('stream', function(stream) {
        offloading();
        setTheirVideo(URL.createObjectURL(stream));
        $("#calling").hide();
        $("#call").show();
        $('.their-id').text(call.peer);
    });

    // UI stuff
    window.existingCall = call;
    $('.their-id').text(call.peer);
    call.on('close', promptCall);
    $('#ask-allow, #make-call, #call').hide();
    $('#calling').show();
}

function setTheirVideo(src) {
    $('#their-video').prop('src', src);
}

function onloading() {
    $("#loading").prop('src', 'loading');
}

function offloading() {
    $("#loading").prop('src', '');
}
