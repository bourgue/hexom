<?php
  if(!empty($_POST))
  {
    include 'database.php';
    $username=$_POST['username'];
    $pos=$_POST['pos'];
    $colors=$_POST['colors'];
    $links=$_POST['links'];
    $backgroundColor=$_POST['backgroundColor'];
    $shadowColor=$_POST['shadowColor'];
    $shadowSize=$_POST['shadowSize'];

    $result = $conn->query("INSERT INTO hexaproperties(username, pos, colors, links, backgroundColor, shadowColor, shadowSize) VALUES ('$username','$pos', '$colors', '$links', '$backgroundColor', '$shadowColor', '$shadowSize')
     ON DUPLICATE KEY UPDATE username='$username', pos='$pos', colors='$colors', links='$links', backgroundColor='$backgroundColor', shadowColor='$shadowColor', shadowSize='$shadowSize'");


    $conn->close();
  }
?>
