<?php
$str = "We live in a society";
$lead = "bob";
$hashedPass = password_hash($str, PASSWORD_DEFAULT);

if (password_verify("$lead" , "$hashedPass"))
	echo "The password matches";
else
	echo "The password is incorrect";

?>
