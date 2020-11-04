// websocket connection & uuid
    var duuid = uuid(8, 16);
    // localhost
    var ws = new WebSocket("ws://localhost:8080");
    // uq server
    // var ws = new WebSocket("wss://s4523761-fableous.uqcloud.net");

// other devices to sync
        var cuxi; // linewidth
        var yanse; // linecolor
        var x1; // shape point x
        var y1; // shape point y
        var z_shape;

        function drawing(x, z, y) {
                ctx.lineWidth = cuxi;
                ctx.strokeStyle = yanse;
                drawLine(x, z, y);
            }
        function click1(x, y) {
                ctx.lineWidth = cuxi;
                ctx.fillStyle = yanse;
                ctx.beginPath();
                ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        function cleaning(x, z, y) {
                ctx.lineWidth = cuxi;
                ctx.strokeStyle = "white";
                drawLine(x, z, y);
            }
        function fillC() {
                ctx.fillStyle=fengg;
                fillCanvas(canvas, ctx, data.x, data.y, fengg);
        }
        function rectangle1(x1, y1, x2, y2,z) {
                ctx.lineWidth = cuxi;
                ctx.strokeStyle = yanse;
                ctx.save();
                ctx.beginPath();
                chosenShape1=z;
                // the below code is more like the functions in script.js
                if (chosenShape1 === "rectangle") {
                    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1); // rectangle shape
                } else if (chosenShape1 === "triangle") {
                    ctx.moveTo(Math.round((x1 + x2) / 2), y1);
                    ctx.lineTo(x1, y2);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(Math.round((x1 + x2) / 2), y1);
                    ctx.stroke(); 
                } else if (chosenShape1 === "circle") {
                    let radius = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
                    ctx.arc(x1, y1, radius,0,2 * Math.PI);
                    ctx.stroke();
                }

                ctx.restore();
                ctx.closePath();
        }
        function textInputf(z,x,y) {
            ctx.fillStyle = yanse; // text input sync
            ctx.textAlign = "left";
            ctx.font = y;
            ctx.fillText(z, x[0], x[1]);
        }
        function addpage1(x) {
            if (pagelists.length <x) { // addpage sync
                document.getElementById("add-page").onclick();
            }

        }
        function switchpage1(x) { //switch pages sync
            if (pageMap.get("currentPage")!=x) {
                document.getElementById("0").onclick();
            }
        }
        // redo and undo sync. As it has some bugs, so comment it.
        // function dodo(x){
        //     let pppp=new Image();
        //     pppp.src=x;
        //     pppp.addEventListener('load',()=>{
        //         ctx.clearRect(0,0,canvas.width,canvas.height);
        //         ctx.drawImage(pppp,0,0);
        //     });
        // }

        ws.onopen = function(e) { //log info about link to socket server
                console.log('Connection to server successfully');
                sendMessage(duuid, 0, 0, 0, 0);
            }

        function sendMessage(uuid, no, x, z, y) {
                ws.send(JSON.stringify({
                    "uuid": uuid, // unique id of the message
                    "no": no, // function id
                    "x": x, // point x
                    "z": z, // point z or some specific data
                    "y": y // point y
                }));
            }
        // select functions to sync based on # (no)
        ws.onmessage = function(e) {
                var data = JSON.parse(e.data);
                if (data.no === 1) {
                    console.log("responding for debug");
                } else if (data.no === 2) {
                    drawing(data.x, data.z, data.y);
                } else if (data.no === 3) {
                    cleaning(data.x, data.z, data.y);
                } else if (data.no === 4) {
                    click1(data.x, data.y);
                } else if (data.no === 5) {
                    initialFill();
                } else if (data.no === 6) {
                    cuxi = data.x;
                } else if (data.no === 7) {
                    fillCanvas(canvas, ctx, data.x, data.y, data.z);
                } else if (data.no === 8) {
                    yanse = data.x;
                } else if (data.no === 9) {
                    x1=data.x["x"];
                    y1=data.x["y"];
                    z_shape=data.z;
                } else if (data.no === 10) {
                    rectangle1(x1,y1,data.x["x"],data.x["y"],z_shape);
                    z_shape=null;
                } else if (data.no === 11) {
                    textInputf(data.z,data.x,data.y);
                } else if (data.no === 12) {
                    addpage1(data.x);
                } else if (data.no === 13) {
                    updateCanvas(data.y);
                    changeCanvas(data.x);
                }
                else if (data.no === 14) {
                    updateCanvas(data.y);
                    changeCanvas(data.x);
                }
                // else if (data.no === 15) { // redo, undo sync.
                //     if (step>0){
                //         history[step]=data.x;
                // } // function bug severe but no good solutions, on experiment featues
                // else if (data.no === 20) {
                //     dodo(data.x);
                // }
            }
        // create unique id, 128-bit number rfc4122 method.
        function uuid(length, base) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); // chars to use
                var uuid = [], i;
                jiuu = base || chars.length; // radix
                if (length) {
                    for (i = 0; i < length; i++) uuid[i] = chars[0 | Math.random() * jiuu];
                } else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'; // the rfc4122 format, with '-' among the numbers
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16; // random seed
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]; // based on [1]
                        }
                    }
                }
                return uuid.join('');
            }

// References
//[1]"RFC 4122 - A Universally Unique IDentifier (UUID) URN Namespace", Tools.ietf.org, 2020. [Online]. Available: https://tools.ietf.org/html/rfc4122. [Accessed: 01- Aug- 2020].