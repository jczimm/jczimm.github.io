navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var key = 'c8rpfwhlmfs9k9';

var hashids = new Hashids(+new Date() + "", 0, "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789"),
    username = hashids.encrypt(1, 2, 3);

// PeerJS object
var peer = new Peer(username, {
    key: key
});

peer.on('open', function() {
    $('#my-id').text(peer.id);
});

// Receiving a call
peer.on('call', function(call) {
    // Answer the call automatically (instead of prompting user) for demo purposes
    call.answer(window.localStream);
    step3(call);
});
peer.on('error', function(err) {
    console.log(err.message);

    switch(err.type){
    	case "peer-unavailable":
    		alert('unable to connect');
    		break;
    }

    // Return to step 2 if error occurs
    step2();
});

// Handlers setup
$(function() {
    $("video").on('contextmenu', function(e) {
        return false;
    });

    $('#make-call').click(function() {
        // Initiate a call!
        var call = peer.call($('#callto-id').val(), window.localStream);

        step3(call);
    });

    $('#end-call').click(function() {
        window.existingCall.close();
        step2();
    });

    // Retry if getUserMedia fails
    $('#step1-retry').click(function() {
        $('#step1-error').hide();
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
        step2();
    }, function() {
        $('#step1-error').show();
    });
}

function step2() {
    $('#step1, #step3').hide();
    $('#step2').show();
}

function step3(call) {
    // Hang up on an existing call if present
    if (window.existingCall) {
        window.existingCall.close();
    }

    // Wait for stream on the call, then set peer video display
    call.on('stream', function(stream) {
        $('#their-video').prop('src', URL.createObjectURL(stream));
    });

    // UI stuff
    window.existingCall = call;
    $('#their-id').text(call.peer);
    call.on('close', step2);
    $('#step1, #step2').hide();
    $('#step3').show();
}
