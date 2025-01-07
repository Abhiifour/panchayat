import express, { json } from 'express';
import { WebSocket } from 'ws';


const app = express();

const httpServer = app.listen(3000);

const wsServer = new WebSocket.Server({ server: httpServer });

type User = {
  socket : WebSocket ;
  room : string ;
  username:string;
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
    console.log(parsedMessage)
    if(parsedMessage.type === "join"){
      allSockets.push({
        socket,
        room:parsedMessage.payload.roomId,
        username:parsedMessage.payload.username
      })

      // const userRoom = allSockets.find((x) => x.socket == socket)
      // const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
      // let usersInRoom = [];
      // currRoom.forEach((function(x){
      //   usersInRoom.push(x.username)
      //   x.socket.send(JSON.stringify(usersInRoom))
      // }))
    }

    if(parsedMessage.type === "chat"){
      const userRoom = allSockets.find((x) => x.socket == socket)
      const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
      currRoom.forEach((function(x){
        x.socket.send(JSON.stringify(parsedMessage.payload))
      }))
    }
     
  });
  console.log('Client connected');
})