<?php
// check whether the user got to this page by clicking the proper signup button.
if (isset($_POST['signup-submit'])) {
  require 'dbh.inc.php';
  // grab all the data which passed from the signup form 
  $username = $_POST['uid'];
  $email = $_POST['mail'];
  $password = $_POST['pwd'];
  $passwordRepeat = $_POST['pwd-repeat'];
  if ($_POST['staff']=='0'){
    $staff=0;
  } else if ($_POST['staff']=='1') {
    $staff=1;
  }
  // check for any empty inputs
  if (empty($username) || empty($email) || empty($password) || empty($passwordRepeat)) {
    header("Location: ../signup.php?error=emptyfields&uid=".$username."&mail=".$email);
    exit();
  }
  // check for an invalid username AND invalid e-mail.
  else if (!preg_match("/^[a-zA-Z0-9]*$/", $username) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../signup.php?error=invaliduidmail");
    exit();
  }
  // check for an invalid username. In this case ONLY letters and numbers.
  else if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) {
    header("Location: ../signup.php?error=invaliduid&mail=".$email);
    exit();
  }
  // check for an invalid e-mail.
  else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: ../signup.php?error=invalidmail&uid=".$username);
    exit();
  }
  // check if the repeated password is NOT the same.
  else if ($password !== $passwordRepeat) {
    header("Location: ../signup.php?error=passwordcheck&uid=".$username."&mail=".$email);
    exit();
  }
  else {
    // check whether or the username is already taken.
    // create the statement that searches database table to check usernames.
    $sql = "SELECT uidUsers FROM users WHERE uidUsers=?;";
    // create a prepared statement.
    $stmt = mysqli_stmt_init($conn);
    // prepare our SQL statement AND check for errors
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      // If there is an error, send the user back to the signup page.
      header("Location: ../signup.php?error=sqlerror");
      exit();
    }
    else {
      // bind the type of parameters to pass into the statement, and bind the data from the user.
      mysqli_stmt_bind_param($stmt, "s", $username);
      // execute the prepared statement and send it to the database
      mysqli_stmt_execute($stmt);
      // store the result from the statement.
      mysqli_stmt_store_result($stmt);
      // check whether the username already exists or not
      $resultCount = mysqli_stmt_num_rows($stmt);
      // close the prepared statement
      mysqli_stmt_close($stmt);
      // check if the username exists
      if ($resultCount > 0) {
        header("Location: ../signup.php?error=usertaken&mail=".$email);
        exit();
      }
      else {
        $sql = "INSERT INTO users (uidUsers, emailUsers, pwdUsers) VALUES (?, ?, ?);";
        // initialize a new statement using the connection from the dbh.inc.php file.
        $stmt = mysqli_stmt_init($conn);
        // prepare SQL statement AND check if there are any errors with it.
        if (!mysqli_stmt_prepare($stmt, $sql)) {
          // If there is an error, send the user back to the signup page.
          header("Location: ../signup.php?error=sqlerror");
          exit();
        }
        else {
          // hashing method to encrypt password.
          $hashedPwd = password_hash($password, PASSWORD_DEFAULT);
          // bind the type of parameters to pass into the statement, and bind the data from the user.
          mysqli_stmt_bind_param($stmt, "sss", $username, $email, $hashedPwd);
          mysqli_stmt_execute($stmt);
          $sql1= "UPDATE users SET staff='$staff' WHERE uidUsers='$username'";
          mysqli_stmt_prepare($stmt, $sql1);
          mysqli_stmt_execute($stmt);
          // send the user back to the signup page with a success message
          header("Location: ../signup.php?signup=success");
          exit();

        }
      }
    }
  }
  // close statement and the database connection
  mysqli_stmt_close($stmt);
  mysqli_close($conn);
}
else {
  // If the user tries to access this page an inproper way, send them back to the signup page.
  header("Location: ../signup.php");
  exit();
}
