<?php

require('Pusher.php');

$pusher = new Pusher(
    '6bd9ea172357cea30784', //APP KEY
    '7736700fdb75b48640ce', //APP SECRET
    '81508' //APP ID
);

$auth = $pusher->socket_auth($_POST['channel_name'], $_POST['socket_id']);

?>
