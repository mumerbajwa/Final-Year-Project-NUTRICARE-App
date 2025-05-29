const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store active connections
const rooms = new Map();

wss.on('connection', (ws) => {
  let currentRoom = null;
  let currentUser = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        currentRoom = data.room;
        currentUser = data.user;
        
        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Map());
        }
        
        rooms.get(currentRoom).set(currentUser, ws);
        
        // Notify others in the room
        rooms.get(currentRoom).forEach((client, user) => {
          if (user !== currentUser) {
            client.send(JSON.stringify({
              type: 'user-joined',
              user: currentUser
            }));
          }
        });
        break;

      case 'offer':
      case 'answer':
      case 'candidate':
        if (rooms.has(currentRoom)) {
          const targetUser = data.target;
          const targetWs = rooms.get(currentRoom).get(targetUser);
          
          if (targetWs) {
            targetWs.send(JSON.stringify({
              type: data.type,
              [data.type]: data[data.type],
              from: currentUser
            }));
          }
        }
        break;
    }
  });

  ws.on('close', () => {
    if (currentRoom && currentUser) {
      const room = rooms.get(currentRoom);
      if (room) {
        room.delete(currentUser);
        
        // Notify others in the room
        room.forEach((client) => {
          client.send(JSON.stringify({
            type: 'user-left',
            user: currentUser
          }));
        });

        // Clean up empty rooms
        if (room.size === 0) {
          rooms.delete(currentRoom);
        }
      }
    }
  });
});

const PORT = process.env.SIGNALING_PORT || 8080;
server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
}); 