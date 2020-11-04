<?php
// check whether the user got to this page by clicking the proper login button.
if (isset($_POST['login-submit'])) {
  require 'dbh.inc.php';
  // grab all the data which passed from the signup form
  $mailuid = $_POST['mailuid'];
  $password = $_POST['pwd'];
  // check for any empty inputs. 
  if (empty($mailuid) || empty($password)) {
    header("Location: ../index.php?error=emptyfields&mailuid=".$mailuid);
    exit();
  }
  else {
    // connect to the database
    $sql = "SELECT * FROM users WHERE uidUsers=? OR emailUsers=?;";
    // initialize a new statement using the connection from the dbh.inc.php file.
    $stmt = mysqli_stmt_init($conn);
    // prepare our SQL statement AND check for errors
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      // If there is an error, send the user back to the signup page.
      header("Location: ../index.php?error=sqlerror");
      exit();
    }
    else {
      // bind the type of parameters to pass into the statement, and bind the data from the user.
      mysqli_stmt_bind_param($stmt, "ss", $mailuid, $mailuid);
      // execute the statement and send it to the database
      mysqli_stmt_execute($stmt);
      // get the results from the statement
      $result = mysqli_stmt_get_result($stmt);
      // store the result into a variable.
      if ($row = mysqli_fetch_assoc($result)) {
        // match the password from the database with the password the user submitted
        $pwdCheck = password_verify($password, $row['pwdUsers']);
        if ($pwdCheck == false) {
          // If there is an error, send the user back to the signup page.
          header("Location: ../index.php?error=wrongpwd");
          exit();
        }
        else if ($pwdCheck == true) {
          // create session based on the users information from the database. 
          session_start();
          // create the session variables.
          $_SESSION['id'] = $row['idUsers'];
          $_SESSION['uid'] = $row['uidUsers'];
          $_SESSION['email'] = $row['emailUsers'];
          $_SESSION['staff'] = $row['staff'];
          // user logged in
          header("Location: ../index.php?login=success");
          exit();
        }
      }
      else {
        header("Location: ../index.php?login=wronguidpwd");
        exit();
      }
    }
  }
  mysqli_stmt_close($stmt);
  mysqli_close($conn);
}
else {
  // If the user tries to access this page an inproper way, send them back to the signup page.
  header("Location: ../signup.php");
  exit();
}
