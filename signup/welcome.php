<?php session_start();?>
<!DOCTYPE HTML>
<html>
     <head>
      <title>Welcome page</title>
      </head>
<body>
<?php 
   // echo the username form index.php
   echo "Welcome, new user " .  $_SESSION["username"] ."<br>"; 
?>
</body>
</html> 
