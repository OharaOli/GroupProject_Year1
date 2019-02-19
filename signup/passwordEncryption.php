<?php
$str = "password";
$lead = "bob";
$hashedPass = password_hash($str, PASSWORD_DEFAULT);

echo $hashedPass;

if (password_verify("$lead" , "$hashedPass"))
	echo "The password matches";
else
	echo "The password is incorrect";

?>
