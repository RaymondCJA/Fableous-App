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
if (isset($_POST["submit"]) && trim($_POST["author"]) != "") {
    $str = $_POST["author"];
    $sql = "SELECT * FROM library WHERE user LIKE '%$str%'";
} else {
    $sql = "SELECT * FROM library ";
}
$result = $conn->query($sql);
$libraryData =array();
$json = '';

class libraryPhotos {
    public $pid;
    public $pname;
    public $user;
    public $imageData;
    public $approvalStatus;
}

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $library_pictures = new libraryPhotos();
        $library_pictures -> pid = $row['pid'];
        $library_pictures -> pname = $row['pname'];
        $library_pictures -> user = $row['user'];
        $library_pictures -> imageData = $row['data'];
        $library_pictures -> approvalStatus = $row['approvalStatus'];
        $libraryData[]=$library_pictures;
    }
    $json = json_encode($libraryData);
} else {
    echo "<script>alert('0 result');</script>";
}
// delete story
if (isset($_GET["id"])) {
    $deleteID=$_GET["id"];
    $dsql = "DELETE FROM library WHERE pname='$deleteID'"; 
    $conn->query($dsql);
    header("Location:waitingapproval.php");
}
if (isset($_GET["uid"])) { //rename story
    $updateID=$_GET["uid"];
    $uname=$_GET["uname"];
    $usql = "UPDATE library SET pname='$uname' WHERE pname='$updateID'"; 
    $conn->query($usql);
    header("Location:waitingapproval.php");
}
// change approval status
if (isset($_GET["approvalStat"])) {
    $updateID2=$_GET["as"];
    $uname3=$_GET["approvalStat"];
    $uname2=$_GET["uname2"];
    $usql2 = "UPDATE library SET approvalStatus='$uname3' WHERE pname='$uname2'"; 
    $conn->query($usql2);
    header("Location:waitingapproval.php");
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/library.css">
</head>
<body>
<div id="browsing-background"></div>
<div id="picture-box">
    <div id="picture">
    </div>
    <div id="picture-button">
        <button id="rename-button">rename</button>
        <button id="delete-button">delete</button>
        <button id="close-button">close</button>
        <button id="approve-button">approve</button>
    </div>
    <div id="input-new-name">
        <input type="text" id="new-name">

        <div id="rename-button-box">
            <button id="confirm-rename-button">confirm</button>
            <button id="cancel-rename-button">cancel</button>
        </div>
    </div>
</div>
<div class="main-part">
    <div id="main-lib">
    <section id="search-bar">
        <form method="POST">
            <label>Search book(s) by author's name: </label>
            <input type="text" name="author">
            <input type="submit" name="submit" value="search">
        </form>
    </section>
        <div id="painting-box">
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
    let paintingBox = document.getElementById("painting-box");
    let storyID = 0;
    let storiesArray = document.getElementsByClassName("stories");
    let libraryImages = null;
    let currentUser = "max";
    let images = new Map();

    window.onload = function () {
        libraryImages = <?php echo $json?>;
        for (let p in libraryImages) {
            if (libraryImages[p].user) {
                // if approve status not 0, ignore it
                if(libraryImages[p].approvalStatus != 0) {
                    continue;
                }
                let tempPname = libraryImages[p].pname;
                let arr = [];
                // create a image array, which contains all picture's attributes
                if (images.get(tempPname)) {
                    arr = images.get(tempPname);
                }
                arr.push(libraryImages[p]);
                images.set(tempPname, arr);
            }
        }
        // add story
        for (let key of images.keys()) {
            addStories(key);
        }
    }

    function addStories(storyname) {
        let stories = document.createElement("div");
        let storyTitle = document.createElement("p");
        let storyAuthor = document.createElement("p");

        storyID = storyID + 1;
        stories.className = "stories";
        stories.id = "stories" + storyID.toString();
        paintingBox.appendChild(stories);
        stories.pname = storyname;

        storyTitle.className = "story-name";
        storyTitle.innerHTML = storyname;
        storyAuthor.innerHTML = '- by '+images.get(storyname)[0].user;
        storyAuthor.style.textAlign='right';
        storyAuthor.style.marginTop='-10px';
        storyAuthor.style.marginRight='3%';

        storyTitle.id = "store-title" + storyID.toString();
        stories.appendChild(storyTitle);
        stories.appendChild(storyAuthor);

        // random cover pictures for stories
        let storiesBG = ["storiesBG1", "storiesBG2", "storiesBG3"];
        let randomBG = "background-image: url('./icon/" + storiesBG[Math.floor(Math.random() * 3)] + ".svg');";
        stories.setAttribute("style", randomBG);

        stories.onclick = function () {

            let background = document.getElementById("browsing-background");
            let picture = document.getElementById("picture-box");

            background.style.visibility = "visible";
            picture.style.visibility = "visible";

            let closeButton = document.getElementById("close-button");
            let deleteButton = document.getElementById("delete-button");
            let renameButton = document.getElementById("rename-button");
            let confirmRenameButton = document.getElementById("confirm-rename-button");
            let cancelRenameButton = document.getElementById("cancel-rename-button");
            let inputNewName = document.getElementById("input-new-name");
            let approveButton = document.getElementById("approve-button");
            let rejectButton = document.getElementById("reject-button");

            approveButton.onclick = function () {
                /*
                background.style.visibility = "hidden";
                picture.style.visibility = "hidden";
                inputNewName.style.visibility = "hidden";*/
                //stories.approvalStatus = 1;
                window.location.href="?approvalStat="+1+"&uname2="+storyTitle.innerHTML;
            }

            closeButton.onclick = function () {
                background.style.visibility = "hidden";
                picture.style.visibility = "hidden";
                inputNewName.style.visibility = "hidden";
            }

            deleteButton.onclick = function () {
                background.style.visibility = "hidden";
                picture.style.visibility = "hidden";
                stories.parentNode.removeChild(stories);
                inputNewName.style.visibility = "hidden";
                window.location.href="?id="+stories.pname;
            }

            renameButton.onclick = function () {
                inputNewName.style.visibility = "visible";
            }

            confirmRenameButton.onclick = function () {
                let newName = document.getElementById("new-name");
                storyTitle.innerHTML = newName.value;
                inputNewName.style.visibility = "hidden";
                newName.value = "";
                window.location.href="?uid="+stories.pname+"&uname="+storyTitle.innerHTML; //this line affects for sure 
            }

            cancelRenameButton.onclick = function () {
                inputNewName.style.visibility = "hidden";
            }

            // get the pictures data and group them

            let arr = images.get(storyname);

            let pictures = document.getElementById("picture");
            pictures.innerHTML="";
            for (let i in arr) {
                let libImage = new Image();
                libImage.src = arr[i].imageData;

                let aDiv = document.createElement("div");
                aDiv.style.width = "auto";
                aDiv.style.height = "440px";
                aDiv.style.margin = "5px";
                // let libCanvas = document.createElement("canvas");
                let libCanvas = document.createElement("img");
                libCanvas.className = "library-canvas";
                // libCanvas.style.width = "580px";
                libCanvas.style.height = "440px";

                pictures.appendChild(aDiv);
                aDiv.appendChild(libCanvas);

                libImage.onload = function () {
                    libCanvas.src=libImage.src;
                    // libCanvas.getContext("2d").drawImage(libImage, 0, 0, libCanvas.width, libCanvas.height);
                }
            }
            // reminder text
            let remindText = document.createElement("p");
            remindText.innerHTML = "Scroll to the right to see more!";
            remindText.style.position = "absolute";
            remindText.style.bottom = "2px";
            remindText.style.right = "2px";
            remindText.style.color = "white";
            remindText.style.border = "1px solid white";
            remindText.style.padding = "3px";
            pictures.appendChild(remindText);
        }
    }
</script>
</body>
</html>
