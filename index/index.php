<?php
  require "header.php";
?>
    <main>
      <div class="wrapper-main">
        <section class="section-default">
          <?php
          // not login page, contains login form and quick login portal (for developers to test)
          if (!isset($_SESSION['id'])) {         
            echo '
            <div style="float:left; width:60%; margin-right:0">
            <img src="img/home.jpg" style="width:100%" alt="home image">
            </div>
            <div class="header-login" style="text-align:center;float:flex; width:35%; margin-top:9%;">
            <form action="includes/login.inc.php" method="post">
            <h2 style="color:#269bb6">F A B L E O U S</h2><br>
            <p style="color:gray">Welcome back! Please login to your account.</p><br>
            <input type="text" name="mailuid" placeholder="E-mail/Username"><br>
            <input type="password" name="pwd" placeholder="Password"><br> 
            <button type="submit" name="login-submit">Login</button><br>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <p class="login-status">(For developer: user/password - test/test)</p><br>
            <p class="login-status">(For teacher: user/password - teacher/teacher)</p><br>
            <p class="login-status">(For student: user/password - student/student)</p>
            <div style="color: gray; border: 2px solid #DDD; margin-top: 20px;">
                Quick Login Demo<br>
                <button id="quickLogin1" name="login-submit" style="font-size: 10px; padding: 10px 3%;">teacher</button>
                <button id="quickLogin2" name="login-submit" style="font-size: 10px; padding: 10px 3%;">student</button>
                <button id="quickLogin3" name="login-submit" style="font-size: 10px; padding: 10px 3%;">developer</button>
            </div>
            </form>
          </div>
          ';
          }
          // 3 demo accounts
          else if (isset($_SESSION['id']) && $_SESSION['id']==1) {
            // developers login
            echo '<br><br><br><br><br><p class="login-status">You are developer !</p><br>';
          }
          else if (isset($_SESSION['id']) && $_SESSION['id']==2) {
            // teachers login
            header('Location: Canvas/teacher.php');
          }
          else if (isset($_SESSION['id']) && $_SESSION['id']==3) {
            // students login
            header('Location: Canvas/home.php');
          }
          // other accounts (normal users)
          else if (isset($_SESSION['id']) && $_SESSION['id']>3 && $_SESSION['staff']==0) {
            // students login
            header('Location: Canvas/home.php');
          }
          else if (isset($_SESSION['id']) && $_SESSION['id']>3 && $_SESSION['staff']==1) {
            // teachers login
            header('Location: Canvas/teacher.php');
          }
          ?>
        </section>
      </div>
    </main>

<script>
    document.getElementById("quickLogin1").onclick = function () { // quick login as teacher
        document.getElementsByName("mailuid")[0].value = "teacher";
        document.getElementsByName("pwd")[0].value = "teacher";
    }
    document.getElementById("quickLogin2").onclick = function () { // quick login as student
        document.getElementsByName("mailuid")[0].value = "student";
        document.getElementsByName("pwd")[0].value = "student";
    }
    document.getElementById("quickLogin3").onclick = function () { // quick login as developer
        document.getElementsByName("mailuid")[0].value = "test";
        document.getElementsByName("pwd")[0].value = "test";
    }
</script>

<?php
?>

