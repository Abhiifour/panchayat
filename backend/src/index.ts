import express from 'express';
import { WebSocket } from 'ws';


const app = express();

const httpServer = app.listen(3000);

const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on('connection', (socket) => {

  socket.on('error', (error) => console.log(error));
  
  socket.on('message', (message , isBinary) => {
    wsServer.clients.forEach(function each(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(message , {binary: isBinary});
        }
    });
    
  });
  console.log('Client connected');
})