<!DOCTYPE html>
<html>
  <head>
    <title>makefile</title>
    <script src="http://momentjs.com/downloads/moment.min.js"></script>
  </head>
  <body>
    <?php
      $file = 'log.txt';
      $handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
      $data = htmlspecialchars($_POST["data"]);
      fwrite($handle, $data);
      
      readfile($handle); // download
    ?>
  </body>
</html>
