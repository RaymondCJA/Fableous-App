<?php
  require "header.php";
?>
    <main>
      <div class="wrapper-main">
        <section class="section-default">
          <h1>Signup</h1>
          <?php
          // Show error message if the user made an error trying to sign up.
          if (isset($_GET["error"])) {
            if ($_GET["error"] == "emptyfields") {
              echo '<p class="signuperror">Fill in all fields!</p>';
            }
            else if ($_GET["error"] == "invaliduidmail") {
              echo '<p class="signuperror">Invalid username and e-mail!</p>';
            }
            else if ($_GET["error"] == "invaliduid") {
              echo '<p class="signuperror">Invalid username!</p>';
            }
            else if ($_GET["error"] == "invalidmail") {
              echo '<p class="signuperror">Invalid e-mail!</p>';
            }
            else if ($_GET["error"] == "passwordcheck") {
              echo '<p class="signuperror">Your passwords do not match!</p>';
            }
            else if ($_GET["error"] == "usertaken") {
              echo '<p class="signuperror">Username is already taken!</p>';
            }
          }
          // Show success message if the new user was created.
          else if (isset($_GET["signup"])) {
            if ($_GET["signup"] == "success") {
              // count to back to homepage to login
              echo '<p class="signupsuccess">Signup successful!</p>
              <p id="time" class="signupsuccess">3 seconds to homepage</p>
              <script>
              setTimeout(function () {
                document.getElementById("time").innerHTML="2 seconds to homepage"
              }, 1000);
              setTimeout(function () {
                document.getElementById("time").innerHTML="1 seconds to homepage"
              }, 2000);
              </script>';
              header('refresh:3;url=index.php');
            }
          }
          ?>
          <form class="form-signup" action="includes/signup.inc.php" method="post">
            <?php
            // check username.
            if (!empty($_GET["uid"])) {
              echo '<input type="text" name="uid" placeholder="Username" value="'.$_GET["uid"].'">';
            }
            else {
              echo '<input type="text" name="uid" placeholder="Username">';
            }
            // check e-mail.
            if (!empty($_GET["mail"])) {
              echo '<input type="text" name="mail" placeholder="E-mail" value="'.$_GET["mail"].'">';
            }
            else {
              echo '<input type="text" name="mail" placeholder="E-mail">';
            }
            ?>
            <input type="password" name="pwd" placeholder="Password">
            <input type="password" name="pwd-repeat" placeholder="Repeat password">
            <select name="staff">
            <option value='0'>student</option>
            <option value='1'>teacher</option>
            </select>
            <br><br>
            <button type="submit" name="signup-submit">Signup</button>
          </form>
        </section>
      </div>
    </main>
