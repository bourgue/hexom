<?php
/*
$key = "AAA";
mysql_connect("localhost", "root", "aqwzsxedc") OR die (mysql_error());
mysql_select_db ("hexamenu") or die(mysql_error());

$query = "INSERT INTO `hexaproperties` (key) VALUES ('AAA')";

$result = mysql_query($query) or die (mysql_error());

if($result) {    
	
}
else{ 
	echo "error";  
}
*/

$username = "root"; //mysql username
$password = "aqwzsxedc"; //mysql password
$hostname = "localhost"; //hostname
$databasename = 'hexamenu'; //databasename

$key = $_POST[key];
$pos = $_POST[pos];
$color = $_POST[color];
$link = $_POST[link];
$backgroundColor = $_POST[backgroundColor];
$shadowColor = $_POST[shadowColor];
$shadowSize = $_POST[shadowSize];
$hexaSize = $_POST[hexaSize];
$hexaOpacity = $_POST[hexaOpacity];
$hexaOpacityHover = $_POST[hexaOpacityHover];

$mysqli = new mysqli($hostname, $username, $password, $databasename);

$results = $mysqli->query("INSERT INTO `hexaproperties` (`key`, `pos`, `color`, `link`, `backgroundColor`, `shadowColor`, `shadowSize`, `hexaSize`, `hexaOpacity`, `hexaOpacityHover`)
												VALUES ('$key', '$pos', '$color', '$link', '$backgroundColor', '$shadowColor', '$shadowSize', '$hexaSize', '$hexaOpacity', '$hexaOpacityHover')");

$mysqli->close();

?>