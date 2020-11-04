<?php
$servername = "localhost";
$username = "root";
// server
// $password = "dbf76fb8c7e45fe1";
// localhost pas
$password="";
$dbname = "fableous";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
} else {
    echo ("connected to " .$dbname);
}

mysqli_close($conn);
?>