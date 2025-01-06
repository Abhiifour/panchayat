import express, { json } from 'express';
import { WebSocket } from 'ws';


const app = express();

const httpServer = app.listen(3000);

const wsServer = new WebSocket.Server({ server: httpServer });

type User = {
  socket : WebSocket ;
  room : string ;
}

let allSockets : User[] = []

wsServer.on('connection', (socket) => {
  
  socket.on('error', (error) => console.log(error));
  
  socket.on('message', (message : string) => {

    // wsServer.clients.forEach(function each(client) {
    //     if (client !== socket && client.readyState === WebSocket.OPEN) {
    //       client.send(message, {binary: isBinary});
    //       //console.log(client)
    //     }
    // });
    
    const parsedMessage = JSON.parse(message)

    if(parsedMessage.type === "join"){
      allSockets.push({
        socket,
        room:parsedMessage.payload.roomId
      })
    }

    if(parsedMessage.type === 'chat'){
      const userRoom = allSockets.find((x) => x.socket == socket)
      const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
      currRoom.forEach((function(x){
        x.socket.send(parsedMessage.payload.message)
      }))
    }
     
  });
  console.log('Client connected');
})