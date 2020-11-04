<?php
  // start a session.
  session_start();
  require "../includes/dbh.inc.php";
  // check login
  if (!$_SESSION['id']){
      echo "<script> {  window.alert('Please login first!');
        window.location.href='../index.php';  } </script>";
  }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher</title>
    <link href="//db.onlinewebfonts.com/c/8df141f447c5686cf9dbae8dabb1e71a?family=AllRoundGothicW01-Bold" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="css/teacher.css">
</head>
<body>
    <div id="body-div">
        <section id="teacher-navigation">
            <span><a style="text-decoration:none;color:white;" href="../index.php">FABLEOUS</a></span>
            <ul class="navigation">
                <li class="active">Class Library</li>
                <li>Waiting Approval</li>
                <li>Approved</li>
                <li>Students</li>
                <li>Setting</li>
            </ul>
        </section>
        <section id="main-part">
            <div id="main-part-head">
                <?php
                if (isset($_SESSION['id'])) {
                    echo '<form action="../includes/logout.inc.php" method="post">
                    <button type="submit" name="login-submit" style="border:1px solid white;color:white;background:#60A6C8;font-size: 16px">Logout</button>
                    </form>';
                }
                ?>
                <div id="notification"><img src="./icon/notifications.png"></div>
                <div id="chat"><img src="./icon/chat.png"></div>
                <div id="name">name</div>
                <div id="profile"></div>
            </div>
            <div class="contents">
                <div id="class-library" class="first-3-page">
                    <section id="class-library-head" class="first-3-page-head">
                        <section id="head-1" class="first-3-page-head-1">
                            <span>Class Library</span>
                            <button style="background-color:#2E9AB4; border:none; color:white" onclick="window.print()">Download</button>
                        </section>
                        <section id="head-2" class="first-3-page-head-2">   
                            <button id="filter" style="background: url('./icon/filter.png') no-repeat; border:none; width:18px; height:18px"></button>
                            <button id="delete" style="background: url('./icon/delete.png') no-repeat; border:none; width:18px; height:18px"></button>
                        </section>
                    </section>
                    <section id="class-library-body" class="first-3-page-body">
                    <embed id="classlib" src="classlib.php" width=100% height=100%>
                    </section>
                </div>
                <div id="waiting-approval" class="first-3-page">
                    <section id="waiting-approval-head" class="first-3-page-head">
                        <section id="head-3" class="first-3-page-head-1">
                            <span>Waiting Approval</span>
                            <button style="background-color:#2E9AB4; border:none; color:white" onclick="window.print()">Download</button>
                        </section>
                        <section id="head-4" class="first-3-page-head-2">
                            <button id="filter" style="background: url('./icon/filter.png') no-repeat; border:none; width:18px; height:18px"></button>
                            <button id="delete" style="background: url('./icon/delete.png') no-repeat; border:none; width:18px; height:18px"></button>
                        </section>
                    </section>
                    <section id="waiting-approval-body" class="first-3-page-body"><embed id="waitingapproval" src="waitingapproval.php" width=100% height=100%></section>
                </div>
                <div id="not-approved" class="first-3-page">
                    <section id="not-approved-head" class="first-3-page-head">
                        <section id="head-5" class="first-3-page-head-1">
                            <span>Approved</span>
                            <button style="background-color:#2E9AB4; border:none; color:white" onclick="window.print()">Download</button>
                        </section>
                        <section id="head-6" class="first-3-page-head-2">
                            <button id="filter" style="background: url('./icon/filter.png') no-repeat; border:none; width:18px; height:18px"></button>
                        </section>
                    </section>
                    <section id="not-approved-body" class="first-3-page-body"><embed id="classlib" src="approved.php" width=100% height=100%></section>
                </div>
                <div id="students">
                    <section id="students-head">
                        <section id="head-7">
                            <span>Students</span>
                            <button id="add-student-button" style="background-color:#2E9AB4; border:none; color:white">Add students</button>
                        </section>
                        <input type="text" value="search..." id="search-student">
                    </section>
                    <section id="students-body">
                        <table id="students-list">
                            <tr>
                                <th>Student Name</th>
                                <th>Student ID</th>
                                <th>Attendence</th>
                                <th>Team</th>
                                <th>Dietary</th>
                                <th>Extra</th>
                                <th>action</th>
                            </tr>
                        </table>
                    </section>
                </div>
                <div id="setting">Setting</div>
                <section id="add-student-window">
                    <label>Student Name: <input type="text" id="add-window-name"></label>
                    <label>Student ID: <input type="text" id="add-window-id"></label>
                    <label>Attendence: <input type="text" id="add-window-att"></label>
                    <label>Team: <input type="text" id="add-window-team"></label>
                    <label>Dietary: <input type="text" id="add-window-diet"></label>
                    <label>Extra: <input type="text" id="add-window-extra"></label>
                    <section>
                        <button id="cancel-add">Cancel</button>
                        <button id="ensure-add">Confirm</button>
                    </section>
                </section>
            </div>
        </section>
    </div>
    <script
            src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous">
    </script>
    <script>
        $(window).on("load", function() {
            $(".contents>div").eq(0).show().siblings().hide();
            loadStudents();
        });

        // Switch between the sections of teacher portal
        $(".navigation>li").click(function() {
            $(this).addClass("active").siblings().removeClass("active");
            var index = $(this).index();
            $(".contents>div").eq(index).show().siblings().hide();
        });
    </script>
    <script src="js/teacher.js"></script>
</body>
</html>

<!-- Reference: Google icons -->