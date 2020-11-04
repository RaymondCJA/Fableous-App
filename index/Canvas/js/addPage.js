// initialize all needed variables
let pageNumber = document.getElementById("page-number");
let pagelists = document.getElementsByClassName("page-list");
let pages = document.getElementById("pages");
let add_page_button = document.getElementById("add-page");
let pagesChild01 = document.getElementById("pages-child-01");
let theCanvas = document.getElementById("myCanvas");
let firstPage = document.getElementById("page-1");
let pageID = 0;
var pageMap = new Map();
pageMap.set("currentPage", 0); // default page id=0
pageMap.set("previousPage", 0);
// reserve the first page
firstPage.id = "" + pageID;
pageID = pageID + 1;
pagesData[parseInt(firstPage.id)] = firstPage;
firstPage.innerHTML = "page - " + pageID;
firstPage.onclick = function () { // switch to the 1st page and load picture
    pagelists = document.getElementsByClassName("page-list");
    let temp = pageMap.get("currentPage");
    pageMap.set("currentPage", parseInt(this.id));
    pageMap.set("previousPage", temp);
    let img = new Image();
    img.src = pagelists[0].data;
    img.onload = function () { // load the canvas data
        theCanvas.getContext("2d").drawImage(img, 0, 0);
        sendMessage(duuid,13,pageMap.get("currentPage"),0,temp);
        $("#page-number>p").html("Page " + 1).css("color","whitesmoke");
        setTimeout(() => {  $("#page-number>p").css("color","black") }, 500);
    }
}
// display or hide the page switch (in thumbnails)
pageNumber.onclick = function () {
    if (pages.style.display === "flex") {
        pages.style.display = "none";
    } else {
        pages.style.display = "flex";
    }
}
// add page
add_page_button.onclick = function () {
    let newPage = document.createElement("div");

    newPage.className = "page-list";
    pagesChild01.appendChild(newPage);
    newPage.id = "" + pageID; // set page id to identity
    pageID = pageID + 1;
    pagesData[parseInt(newPage.id)] = newPage;

    $("#page-number>p").html("Page " + pageID);
    // switch pages
    let temp = pageMap.get("currentPage");
    pageMap.set("currentPage", parseInt(newPage.id));
    pageMap.set("previousPage", temp);

    pagelists = document.getElementsByClassName("page-list");
    pagelists[pageMap.get("previousPage")].data = theCanvas.toDataURL(); // get the canvas data
    initialFill();
    newPage.innerHTML = "page - " + pageID;
    newPage.data = theCanvas.toDataURL();
    sendMessage(duuid,12,pagelists.length,0,0);
    // switch page and load canvas data
    newPage.onclick = function () {
        let temp = pageMap.get("currentPage");
        pageMap.set("currentPage", parseInt(newPage.id));
        pageMap.set("previousPage", temp);
        let img = new Image();
        img.src = pagelists[parseInt(newPage.id)].data;
        img.onload = function () {
            theCanvas.getContext("2d").drawImage(img, 0, 0);
            sendMessage(duuid,14, parseInt(newPage.id),0,temp);
            let n = parseInt(newPage.id) + 1;
            $("#page-number>p").html("Page " + n).css("color","whitesmoke");
            setTimeout(() => {  $("#page-number>p").css("color","black") }, 500);
        }
    }
}
