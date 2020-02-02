<?php

echo "<html><body bgcolor='#093'>";
echo "<br/>";
echo "<table border='1' align='center' style='width:200px'>";
echo "<th colspan='2'>Score</th>";
$con=mysqli_connect("127.0.0.1","ajax_user22","ajax_user22","ajax_user22");

// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
} else {
  //echo "Connected <br>" ;
}

//$s_id = $_GET["id"];
$sql = "Select name,max(score) from player group by name order by max(score) desc limit 10";

$result = mysqli_query($con,$sql);
while($row = mysqli_fetch_array($result)){
   echo "<tr>" . "<td>" . $row['name'] . "</td><td>" . $row['max(score)'] . "</td></tr>";
}
echo "</table>";
echo "</body></html>";

   mysqli_close($con);
?>