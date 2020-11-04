
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); // prevent the default dragging action on touch screen.
  }, {passive: false}); //passive, for compatibility with IOS and Android

// get all elements from the page and settle all variables
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let choose = document.getElementById("choose");
let pencil = document.getElementById("pencil");
let eraser = document.getElementById("eraser");
let fill = document.getElementById("fill");
let rectangle = document.getElementById("rectangle");
let triangle = document.getElementById("triangle");
let circle = document.getElementById("circle");
let clear = document.getElementById("clear");
let adjustSize = document.getElementById("adjust-size");
let lineWeightDemo = document.getElementById("line_weight_display");
let colorPanel = document.getElementById("color-pad");
let colorPanelButton = document.getElementById("color-pad-button");
let onOffColorPanel = false;
let theStoryText = "";
let pagesData = [];

// input text
let inputTextButton = document.getElementById("text");
inputTextButton.isTexting = false;

let colors = [];
for (let c = 0; c < 12; c++) {
    colors.push(document.getElementById("c" + c));
    colors[c].onclick = function () { // click the color blocks
        ctx.fillStyle = window.getComputedStyle(this).backgroundColor; // change fillStyle
        ctx.strokeStyle = ctx.fillStyle;
        chosenColor.childNodes[0].style.opacity = "0"; // hide the previous selected color's ✅
        this.childNodes[0].style.opacity = "1"; // show new ✅ on new chosen color block
        chosenColor = this;
        sendMessage(duuid,8,ctx.strokeStyle,0,0); // send fill color
        document.getElementById("chosen-color").style.backgroundColor = getComputedStyle(colors[c], null)['backgroundColor'];
    }
}
let chosenColor = colors[11]; // the default color is black.
let rangeValue = document.getElementById("slider");


canvas.width = Math.floor(document.getElementById("canvas-box").offsetWidth - 4);
canvas.height = Math.floor(document.getElementById("canvas-box").offsetHeight - 4);

ctx.lineJoin = "round";
ctx.lineCap = "round";

let painting = false;
let lastPoint = null;
let points = [];
let isDrawingShape = false;
let shapingVar = {"startP": null, "endP":null, "originalImage": null};

const toolBox = ["choose", "pencil", "fill", "shaping"];
let chosenTool = toolBox[0];
let stylus = 2; // using 'send' to check whether drawing or erasing
let chosenShape = null;

// bind event listener to the three main action, mouse down, move and up
canvas.addEventListener("mousedown", down, false);
canvas.addEventListener("mousemove", move, false);
canvas.addEventListener("mouseup", up, false);

// touch event relevant
canvas.addEventListener("touchstart", touchDown, false);
canvas.addEventListener("touchmove", touchMove, false);
canvas.addEventListener("touchend", touchUp, false);

let pointForTouchUp = {"clientX": 0, "clientY": 0};

function touchDown(e) {
    e = e.touches[0]; // get the first touch point event info
    down(e);
}

function touchMove(e) {
    e = e.touches[0]; // get the first touch point event info
    move(e);
    pointForTouchUp = [e.clientX, e.clientY]; // touchEnd event has no position info so we save point info here.
}

function touchUp(e) {
    e = pointForTouchUp; // get point info from last move record
    up(e);
}

// initialize the canvas with 100% opacity white rather than the original 0% black
initialFill();

ctx.lineWidth = 3; // initializing the line width

/* text input */
let textWindow = document.createElement("div");
textWindow.id = "text.window";
textWindow.style.position = "absolute";
textWindow.style.visibility = "hidden";
textWindow.style.display = "flex";
let textContent = document.createElement("textarea");
textContent.type = "text";
textContent.id = "text-content";
textContent.placeholder = "What's the story like..";
let fontSizeBox = document.createElement("div");
fontSizeBox.id = "fontSizeBox";
let fontGroups = [document.createElement("button"),
                    document.createElement("button"),
                    document.createElement("button")];
let inputFontSize = 18;
// console.log(inputFontSize);
fontGroups.forEach(function (item, index) {
    fontSizeBox.appendChild(item);
    item.innerText = "A";
    if (index === 0) { item.style.color = "lightcoral"; item.style.cursor = "default";}
    item.onclick = function () {
        inputFontSize = index * 8 + 18;
        textContent.style.fontSize = inputFontSize + "px";
        fontGroups.forEach(function (item) { item.style.color = ""; item.style.cursor = "pointer";});
        this.style.color = "lightcoral";
        this.style.cursor = "default";
    };
});
let confirmText = document.createElement("button");
confirmText.id = "confirm-content";
confirmText.innerText = "confirm";

document.body.appendChild(textWindow);
textWindow.appendChild(textContent);
textWindow.appendChild(fontSizeBox);
textWindow.appendChild(confirmText);

/** Mouse Events */

// define mouse down function
function down(e) {
    if (chosenTool === toolBox[1]) { // pencil drawing mode
        painting = true;
        let {x, y} = getPoints(e);
        points.push({x, y});
        lastPoint = {x, y};

        // sync the pencil weight and color at first
        rangeValue.oninput();
        if (stylus === 2){
            chosenColor.onclick();
        } else if (stylus === 3) {
            ctx.fillStyle = "#ffffff";
        }

        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
        // send mouse down event
        sendMessage(duuid, 4, x, 0, y);
    } else if (chosenTool === toolBox[2]) { // fill mode
        // pass
    } else if (chosenTool === toolBox[3]) { // shaping mode
        shapingVar.startP = getPoints(e);
        isDrawingShape = true;
        // record origin canvas and choose this page's color and width
        rangeValue.oninput();
        chosenColor.onclick();
        shapingVar.originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    if (inputTextButton.isTexting) {
        let tx = e.clientX;
        let ty = e.clientY;
        let {x, y} = getPoints(e);
        textWindow.style.left = tx + "px";
        textWindow.style.top = ty + "px";
        textWindow.style.visibility = "visible";

        confirmText.onclick = function () {
            ctx.textAlign = "left";
            ctx.font = inputFontSize + "px Arial";
            ctx.fillText(textContent.value, x, y);
            sendMessage(duuid,11, [x,y],textContent.value,ctx.font);
            theStoryText = theStoryText + textContent.value + ". ";
            textContent.value = "";
            textWindow.style.visibility = "hidden";
        }
    }
}

// define mouse move function
function move(e) {
    if (chosenTool === toolBox[1]) { // pencil drawing mode
        if (!painting) return;

        let {x, y} = getPoints(e);
        points.push({x, y});

        if (points.length >= 3) {
            // Use the Bessel function to make the lines more silky
            let lastTwoPoints = points.slice(-2);
            let controlPoint = lastTwoPoints[0];
            let endPoint = {
                x: (controlPoint.x + lastTwoPoints[1].x) / 2,
                y: (controlPoint.y + lastTwoPoints[1].y) / 2,
            };
            // sync the pencil weight and color at first
            rangeValue.oninput();
            if (stylus === 2){
                chosenColor.onclick();
            } else if (stylus === 3) {
                ctx.strokeStyle = "#ffffff";
            }

            // different tools in mouse move
            drawLine(lastPoint, controlPoint, endPoint);
            // send draw or eraser
            sendMessage(duuid, stylus, lastPoint, controlPoint, endPoint);
            lastPoint = endPoint;
        }
    } else if (chosenTool === toolBox[2]) { // fill mode
        // pass
    } else if (chosenTool === toolBox[3]) { // shaping mode
        if (isDrawingShape) {
            shaping(shapingVar.startP["x"], shapingVar.startP["y"],
                getPoints(e)["x"], getPoints(e)["y"]);
            shapingVar.endP = getPoints(e);
            sendMessage(duuid,9,shapingVar.startP,chosenShape);
        }
    }
}

// define mouse up function
function up(e) {
    if (chosenTool === toolBox[1]) { // pencil drawing mode
        if (!painting) return;

        let {x, y} = getPoints(e);
        points.push({x, y});

        lastPoint = null;
        painting = false;
        points = [];
    } else if (chosenTool === toolBox[2]) { // fill mode
        let {x, y} = getPoints(e);
        fillCanvas(canvas, ctx, x, y, ctx.fillStyle);
        // send fill
        sendMessage(duuid, 7, x, ctx.fillStyle, y);
    } else if (chosenTool === toolBox[3]) { // shaping mode
        isDrawingShape = false;
        sendMessage(duuid,10,shapingVar.endP,0,0);
    }
    // saveHistory(); // undo/redo but have some bugs, so comment it
}

function updateCanvas(number) {
    pagelists[number].data = canvas.toDataURL();
    pagesData[number].data = canvas.toDataURL();
}

// Change canvas to the page that the Texter chosen
function changeCanvas(number) {
//   console.log("Change: " + number);
  let img = new Image();
  img.src = pagesData[number].data;
  img.onload = function () {
      theCanvas.getContext("2d").drawImage(img, 0, 0);
  }
  let n = number + 1;
  $("#page-number>p").html("Page " + n);
}

/** Drawings */
// get mouse position
function getPoints(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x : Math.round(e.clientX - rect.left),
        y : Math.round(e.clientY - rect.top),
    }
}

// draw lines according to points
function drawLine(begin, control, end) {
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.quadraticCurveTo(control.x, control.y, end.x, end.y);
    ctx.stroke();
    ctx.closePath();
}

// mouse leave the canvas
canvas.onmouseleave = function () {
    painting = false;
    isDrawingShape = false;

    // update local canvas data
    updateCanvas(pageMap.get("currentPage"));
};

/** Fillings */

function initialFill() {
    let temp = ctx.fillStyle;
    ctx.fillStyle = "#FFFFFF"; // fill the canvas with 100% opacity white
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = temp; // change back the fill style
}

function fillCanvas(canvas, ctx, X, Y, newColor) {
    X = Math.floor(X);
    Y = Math.floor(Y);
    let width = canvas.width;
    let height = canvas.height;

    // get all points data on the canvas
    let canvasData = ctx.getImageData(0, 0, width, height);

    // get row Y column X image point's data
    let i = Y * width + X;
    let colorR = canvasData.data[4 * i];
    let colorG = canvasData.data[4 * i + 1];
    let colorB = canvasData.data[4 * i + 2];

    // Gets the RGB of fill colors, and jumps out if it is the same as the target
    let fillingColor = hexToRGB(newColor);
    if (colorR===fillingColor.R && colorG===fillingColor.G && colorB===fillingColor.B) {
        return;
    }

    // set stack, the stack bottom is the start point
    let stackColumn = [X];
    let stackRow = [Y];
    let c; // column
    let r; // row

    function CheckNewPoint(r, c){
        let n = r * width + c; // get point's data
        let needColorR = canvasData.data[4 * n];
        let needColorG = canvasData.data[4 * n + 1];
        let needColorB = canvasData.data[4 * n + 2];
        // check color and save points
        if( c>=0 && c <= width && r>=0 && r<= height
            && needColorR === colorR && needColorG === colorG && needColorB ===colorB) {
            // if match then change color
            canvasData.data[4 * n] = fillingColor.R;
            canvasData.data[4 * n + 1] = fillingColor.G;
            canvasData.data[4 * n + 2] = fillingColor.B;
            // and push to the stack
            stackRow.push(r);
            stackColumn.push(c);
        }
    }

    // non-recursion seed fill algorithm
    while(true){
        if(stackColumn.length <= 0){ // jump out if the stack is empty
            break;
        }
        c = stackColumn.pop();
        r = stackRow.pop();
        CheckNewPoint(r, c);
        CheckNewPoint(r + 1, c);
        CheckNewPoint(r - 1, c);
        CheckNewPoint(r, c + 1);
        CheckNewPoint(r, c - 1);
        CheckNewPoint(r + 1, c + 1);
        CheckNewPoint(r + 1, c - 1);
        CheckNewPoint(r - 1, c + 1);
        CheckNewPoint(r - 1, c - 1);
        CheckNewPoint(r + 2, c);
        CheckNewPoint(r - 2, c);
        CheckNewPoint(r, c + 2);
        CheckNewPoint(r, c - 2);
        CheckNewPoint(r + 2, c + 2);
        CheckNewPoint(r + 2, c - 2);
        CheckNewPoint(r - 2, c + 2);
        CheckNewPoint(r - 2, c - 2);
    }

    ctx.putImageData(canvasData, 0, 0);
}

/* HEX to RGB，such as "#FFFFFF" to {R: 255, G: 255, B: 255} */
function hexToRGB(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b; // including short hand
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        R: parseInt(result[1], 16),
        G: parseInt(result[2], 16),
        B: parseInt(result[3], 16)
    } : null;
}

/** Shaping */
function initShaping() {
    initialFill();  // clear canvas
    ctx.putImageData(shapingVar.originalImage, 0, 0);  // recover origin image
}

function shaping(x1, y1, x2, y2) {
    ctx.save();
    ctx.beginPath();

    self.initShaping();  // redraw the shape whenever the mouse moving to show real time shaping
    if (chosenShape === "rectangle") {
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); // draw shape
    } else if (chosenShape === "triangle") {
        ctx.moveTo(Math.round((x1 + x2) / 2), y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(Math.round((x1 + x2) / 2), y1);
        ctx.stroke();
    } else if (chosenShape === "circle") {
        let radius = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        ctx.arc(x1, y1, radius,0,2 * Math.PI);
        ctx.stroke();
    }

    ctx.restore();
    ctx.closePath();
}


/** Tool Buttons */

// click choose button
choose.onclick = function () {
    chosenTool = toolBox[0];
    // turnOffTexting();
    showHideSMT(adjustSize, "hide", "none");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass();
    turnOffTexting();
}

// click pencil button
pencil.onclick = function () {
    ctx.strokeStyle = ctx.fillStyle;
    stylus = 2;
    chosenTool = toolBox[1]; // pencil
    // turnOffTexting();
    showHideSMT(adjustSize, "show", "block");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass().addClass("cursorPencil");
};

// click eraser button
eraser.onclick = function () {
    ctx.strokeStyle = "#ffffff";
    stylus = 3;
    chosenTool = toolBox[1]; // pencil
    // turnOffTexting();
    showHideSMT(adjustSize, "show", "block");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass().addClass("cursorEraser");
    turnOffTexting();
};

// click fill button
fill.onclick = function () {
    chosenTool = toolBox[2];
    chosenColor.onclick();
    showHideSMT(adjustSize, "hide", "none");
    // turnOffTexting();
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass().addClass("cursorFill");
}

// click rectangle button
rectangle.onclick = function () {
    chosenTool = toolBox[3];
    chosenColor.onclick();
    chosenShape = "rectangle";
    // turnOffTexting();
    showHideSMT(adjustSize, "show", "block");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass();
}

// click triangle button
triangle.onclick = function () {
    chosenTool = toolBox[3];
    chosenColor.onclick();
    chosenShape = "triangle";
    // turnOffTexting();
    showHideSMT(adjustSize, "show", "block");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass();
}

// click circle button
circle.onclick = function () {
    chosenTool = toolBox[3];
    chosenColor.onclick();
    chosenShape = "circle";
    // turnOffTexting();
    showHideSMT(adjustSize, "show", "block");
    selectTool($(".toolBox-buttons"), $(this).index());
    $("#myCanvas").removeClass();
}

// click clear button
clear.onclick = function () {
    initialFill();
    // send clear
    sendMessage(duuid, 5, 0, 0, 0);
    // turnOffTexting();
    showHideSMT(adjustSize, "hide", "none");
    selectTool($(".toolBox-buttons"), $(this).index());
};

// click color panel function
colorPanelButton.onclick = function () {
    if (onOffColorPanel === false) {
      showHideSMT(colorPanel, "show", "flex");
      onOffColorPanel = !onOffColorPanel;
    } else {
      showHideSMT(colorPanel, "hide", "none");
      onOffColorPanel = !onOffColorPanel;
    }
}

// click text button
inputTextButton.onclick = function () {
    chosenColor.onclick();
    // change to cursor
    chosenTool = toolBox[0];
    selectTool($(".toolBox-buttons"), $(this).index());
    inputTextButton.isTexting = !inputTextButton.isTexting;
    if (!inputTextButton.isTexting) {
        textWindow.style.visibility = "hidden";
    }
    $("#myCanvas").removeClass();
}

function turnOffTexting() { // turn off texting when clicking other buttons
    inputTextButton.isTexting = false;
    textWindow.style.visibility = "hidden";
}

/** Additional Tools */
rangeValue.oninput = function () {
    ctx.lineWidth = Math.round(rangeValue.value / 100 * 40);
    if (ctx.lineWidth < 3) {
        ctx.lineWidth = 3;
    }
    sendMessage(duuid, 6, ctx.lineWidth, 0, 0); // send weight
    if (lineWeightDemo != null) {
        $(lineWeightDemo).css("height", String(ctx.lineWidth) + "px");
        $(lineWeightDemo).css("width", (((String(ctx.lineWidth)-3)/37)*25+100) + "px");
        $(lineWeightDemo).css("border-radius", String(ctx.lineWidth) + "px");
        $(lineWeightDemo).css("right", (30-(lineWeightDemo.offsetWidth-100)) + "px");
    }
};

function showHideSMT(obj, str1, str2) {
  if (str1 === "show") {
    obj.style.display = str2;
  } else {
    obj.style.display = "none";
  }
}

$(window).on("load", function() {
    selectTool($(".toolBox-buttons"), 0);
});

function selectTool(obj, i) {
    obj.eq(i).css("backgroundColor", "#60A6C8").siblings().css("backgroundColor", "#a6b1bc");
}

let showToolBoxButton = document.getElementById("show-toolBox-button");
let isToolBoxDisplaying = false;
let toolBoxDOM = document.getElementById("toolBox");
showToolBoxButton.onclick = function () {
  if (isToolBoxDisplaying === false) {
    showHideSMT(toolBoxDOM, "show", "flex");
    isToolBoxDisplaying = !isToolBoxDisplaying;
  } else {
    showHideSMT(toolBoxDOM, "hide", "none");
    isToolBoxDisplaying = !isToolBoxDisplaying;
  }
}