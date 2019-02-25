<?php 
    session_start(); 

    //https://stackoverflow.com/questions/5373780/how-to-catch-this-error-notice-undefined-offset-0
    //^ code to help with catching 'notices' (undefined variable notice)
    set_error_handler('exceptions_error_handler');

    function exceptions_error_handler() 
    {
        //Temporarily login page, SHOULD BE CHANGED TO MAIN INDEX PAGE
        header("Location: ../index.html");
        exit();   
    }

    $username = $_SESSION['username']; 
?>

<!DOCTYPE HTML>
<html lang ="en">  
<head>
      <title>Hub</title>


</head>
<body>
<h1>The Hub. </h1>
<!--REDIRECTION SHOULD BE CHANGED TO THE QUIZ CREATOR PAGE-->
<form method="post" action="../index.html">
<input type="submit" name = "CREATE NEW" value = "Create New">
</form>
</body>
</html>
