<?php
    if(!empty($_POST))
    {
      $connection = mysql_connect("localhost", "root", "test");
      $db = mysql_select_db("hexamenu", $connection);
      $username=$_POST['username'];
      $password=$_POST['password'];
      $email=$_POST['email'];
      $query = mysql_query("INSERT INTO users(username, password, email) VALUES ('$username','$password','$email')"); //Insert query
      if($query){
        echo "Data Submitted succesfully";
      }
    mysql_close($connection); // Connection Closed.
  }
?>
