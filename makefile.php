<!DOCTYPE html>
<html>
  <head>
    <title>makefile</title>
    <script src="http://momentjs.com/downloads/moment.min.js"></script>
  </head>
  <body>
    <?php
      /*$file = 'log.txt';
      $handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
      $data = htmlspecialchars($_POST["data"]);
      fwrite($handle, $data);
      
      readfile($handle); // download*/
      
      $handle = fopen("log.txt", "w") or die("Cannot open file");
      fwrite($handle, $_POST["data"]);
      fclose($handle);
  
      header('Content-Type: application/octet-stream');
      header('Content-Disposition: attachment; filename='.basename('log.txt'));
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      header('Pragma: public');
      header('Content-Length: ' . filesize('log.txt'));
      readfile('log.txt');
      exit;
    ?>
  </body>
</html>
