var step = -1;
let history = [];
// record the history of the image
function saveHistory() { 
    step+=1; 
    if (step < history.length) {
        canvas.length = step;
    }
    history[step]=canvas.toDataURL();
    sendMessage(duuid,15,history[step],0,0);
}
// undo
function undo() {
    if (step>0) {
        step-=1;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let pic111= new Image();
        pic111.src=history[step];
        sendMessage(duuid,20,pic111.src,0,0);
        pic111.addEventListener('load',()=>{
            ctx.drawImage(pic111,0,0);
        });
    } else{
        alert("cannot undo more");
    }
}
// redo
function redo() {
    if (step<history.length-1) {
        step+=1;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        let pic111= new Image();
        pic111.src=history[step];
        sendMessage(duuid,20,pic111.src,0,0);
        pic111.addEventListener('load',()=>{
            ctx.drawImage(pic111,0,0);
        });
    } else{
        alert("cannot redo again");
    }
}