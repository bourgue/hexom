<?php
    if(!empty($_POST))
    {
      include 'database.php';
      $username=$_POST['username'];
      $password=$_POST['password'];
      $email=$_POST['email'];

      $result = $conn->query("SELECT * FROM hexaproperties WHERE username='$username'");

      if(mysqli_num_rows($result) > 0)
        echo 'err_username';
      else{
        $result = $conn->query("INSERT INTO users(username, password, email) VALUES ('$username','$password','$email')");
      }

      $conn->close();
  }
?>
