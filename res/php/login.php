<?php
  if(!empty($_POST))
  {
    include 'database.php';
    $username=$_POST['username'];
    $password=$_POST['password'];

      $result = $conn->query("SELECT * FROM users WHERE username='$username'");

    if(mysqli_num_rows($result) == 0)
      echo 'no_account';
    else{
      $result = $conn->query("SELECT * FROM users WHERE password='$password'");
      if(mysqli_num_rows($result) == 0)
        echo 'err_mdp';
      else{
        $result = $conn->query("SELECT * FROM hexaproperties WHERE username='$username'");
        $row = $result->fetch_array(MYSQLI_ASSOC);
        echo json_encode($row);
      }
    }
    
    $conn->close();
  }
?>
