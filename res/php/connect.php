<?php

$search = $_POST["key"];
mysql_connect("localhost", "root", "aqwzsxedc") OR die (mysql_error());
mysql_select_db ("hexamenu") or die(mysql_error());

$query = "SELECT * FROM `hexaproperties` WHERE `key` LIKE '$search'";

$result = mysql_query($query) or die (mysql_error());

if($result) {    
	while($row=mysql_fetch_row($result))   {      
		echo $row[1] . "|" . $row[2] . "|" . $row[3];   
	}    
}
else{ 
	echo "error";  
}

?>