<?php

if($_POST["name"]) {
	mail("ngiuliani507103@hotmail.com", "Form to email message", $_POST["name"], "From: an@email.address");
}


?>