// localhost version, only for test locally, 8080
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080, 'Access-Control-Allow-Origin': "*"
    });
var clients = [];
console.log('running');
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
        console.log('levaing');
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].ws === ws) {
                sendMsg(clients[i].id, 7, 0, 0);
                clients.splice(i, 1);
                break;
            }
        }
    });
});

function sendMsg(uuid, no, x, z, y) {
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
