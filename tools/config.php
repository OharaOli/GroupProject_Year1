<?php

ini_set("display_startup_errors",1);
ini_set("display_errors",1);
error_reporting(-1);

$hostname = "dbhost.cs.man.ac.uk";
$username = "d06123oo";
$password = "Discover9080";
$database = "2018_comp10120_y7";

$mysqli = new mysqli($hostname, $username, $password, $database);

if (mysqli_connect_errno())
{
   printf("Connection failed");
   exit();
}

?>
