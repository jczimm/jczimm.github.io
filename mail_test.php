<html>
<body>
<form method="post" action="">
<table border="0">
<tr><td> Subject:</td><td> <input type="text" name="subject" /></td></tr>
<tr><td> Message:</td><td> <input type="text" name="message" /></td></tr>
<tr><td> <input type="submit" value="Submit" name="submit"/></td><td><input type="reset" value="Clear" /></td></tr>
</table>
</form>
</body>
</html>
<?php
    if(isset($_POST['submit']))
{
    $subject  = $_REQUEST['subject'];
    $message = $_REQUEST['message'];
    $email = "jczimm.alias@gmail.com";
    mail($email, $subject, $message);
    echo "Email sent";
}

?>