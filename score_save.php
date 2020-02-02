<?php

echo "Trying to connect <br>" ;
$con=mysqli_connect("127.0.0.1","ajax_user22","ajax_user22","ajax_user22");

// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
  echo "Connected <br>" ;
}

$s_name = $_GET["name"];
$s_score = $_GET["score"];

//$sql = "insert into player (name,score) values ('ola',3)";
$sql = "insert into player (name, score) values ('$s_name','$s_score')";

$result = mysqli_query($con,$sql);

   mysqli_close($con);
?>
