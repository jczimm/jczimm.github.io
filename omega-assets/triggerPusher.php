<!DOCTYPE html>
<?php

//include the pusher publisher library
include_once 'Pusher.php';
 
$pusher = new Pusher(
    '6bd9ea172357cea30784', //APP KEY
    '7736700fdb75b48640ce', //APP SECRET
    '81508' //APP ID
);
 
//get the message posted by our ajax call
$message = $_POST['message'];

$pusher->trigger(
    'leaderboard', //the channel
    'new_highscore', //the event
    array('message' => $message) //the data to send
);
 
//echo the success array for the ajax call
echo json_encode(array(
    'message' => $message,
    'success' => true
));
exit();

?>
