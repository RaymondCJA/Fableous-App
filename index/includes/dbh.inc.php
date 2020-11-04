<?php
$dBServername = "localhost";
$dBUsername = "root";
$dBPassword = "";
// $dBPassword= "dbf76fb8c7e45fe1";
$dBName = "fableous";

// Create connection
$conn = mysqli_connect($dBServername, $dBUsername, $dBPassword, $dBName);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
