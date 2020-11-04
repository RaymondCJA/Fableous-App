// uq server version, nodejs listen to port 8081
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
        port: 8081
    });
const clients = [];
console.log('WS running');
// when connect, refer the send message function, and transfer the data
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        var data = JSON.parse(message);
        if (data.no !== 0) {
            sendMsg(data.uuid, data.no, data.x, data.z, data.y);
        } else {
            clients.push({
                "id": data.uuid,
                "ws": ws
            });
            sendMsg(data.uuid, 6, data.x, data.z, data.y);
        }
    });
    ws.on('close', function(e) {
        console.log('someone is levaing'); // for debug
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].ws === ws) {
                sendMsg(clients[i].id, 7, 0, 0);
                clients.splice(i, 1);
                break;
            }
        }
    });
});

function sendMsg(uuid, no, x, z, y) { // same as the function in sync.js
    // if (clients[i].ws.readyState === WebSocket.OPEN) // might not use
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].id !== uuid) {
            clients[i].ws.send(JSON.stringify({
                "uuid": uuid,
                "no": no,
                "x": x,
                "z": z,
                "y": y
            }));
        }
    }
}
