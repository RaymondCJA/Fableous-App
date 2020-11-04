<?php
$servername = "localhost";
$username = "root";
// server
// $password = "dbf76fb8c7e45fe1";
// localhost pas
$password = "";
$dbname = "fableous";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$pname = $_POST["pname"];
$user = $_POST["user"];
$data = $_POST["data"];
$pdata1 = null;
$story=$_POST["story"];
//echo $data."\n"; // for test
$pages = explode("data:image/png;base64,", $data);
$number = count($pages);
foreach($pages as $key => $pdata) {
    if (!$pdata=="") {
        $pdata1 = "data:image/png;base64,". str_replace(",","",$pdata); // make a completed base64 format of picture
        // sql statements
        $sql = "INSERT INTO library (pname, user, data, story)
        VALUES ('$pname', '$user', '$pdata1','$story')";
        // insert and check it
        if ($conn->query($sql) === FALSE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
            return;
        }
    }
    if ($key == $number - 1) {
        echo "<script> alert('save succeed');history.back();</script>";
    }
}
$conn->close();
?>