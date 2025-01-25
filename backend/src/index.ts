import express, { json } from 'express';
import { WebSocket } from 'ws';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express();
app.use(express.json())

const httpServer = app.listen(3001);

const wsServer = new WebSocket.Server({ server: httpServer });

type User = {
  socket : WebSocket ;
  room : string ;
  username:string;
  avatarUrl:string;
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
        username:parsedMessage.payload.username,
        avatarUrl:parsedMessage.payload.avatarUrl
      })

      const userInRoom = allSockets.filter((x) => x.room === parsedMessage.payload.roomId)

      // addUserAndRoom({username:parsedMessage.payload.username,avatarUrl:parsedMessage.payload.avatarUrl,roomId:parsedMessage.payload.roomId})

      userInRoom.forEach((x) => {
        x.socket.send(JSON.stringify({
          type:"join",
          payload:{
            usersAvailable : userInRoom.length,
            joined : `${parsedMessage.payload.username} has joined the room`
          }
        }))
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
        x.socket.send(JSON.stringify({
          type:"chat",
          payload:parsedMessage.payload}))
      }))

      // addChat({username:parsedMessage.payload.username,message:parsedMessage.payload.message,roomId:parsedMessage.payload.roomId})

    }

    if(parsedMessage.type === "close"){
      const userRoom = allSockets.find((x) => x.socket == socket)
      const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
  
      currRoom.forEach((x) => {
        x.socket.send(JSON.stringify({
          type:"close",
          payload:`${userRoom?.username} has left the room`
        }))
      })
    }

    socket.on("close",()=>{
      const user = allSockets.find((x) => x.socket == socket)
      const temp = allSockets.filter((x) => x == user)
      allSockets = temp;

    })
    
    
  });
 
   
  console.log('Client connected');
})


app.post('/', async(req,res) :Promise<any> =>{
  const username = req.body.username
  const avatarUrl = req.body.avatarUrl;
  try {
     await prisma.user.create({
    data:{
      username : username,
      avatar:avatarUrl
    }
  })
  
  } catch (error) {
    return res.json({
      msg:error
    })
  }
 
  res.json({
    msg:"hi there!!"
  })
})


async function addUserAndRoom({username,avatarUrl,roomId}:{username:string,avatarUrl:string,roomId:string,}){

try {

  const userExists = await prisma.user.findFirst({
    where:{
      username:username
    }
  })

  if(!userExists){

    const user = await prisma.user.create({
      data:{
        username:username,
        avatar:avatarUrl
      }
    })
  
    const userId = user.id
  
    const roomExists = await prisma.room.findFirst({
      where:{
        roomId:roomId
      }
    })

    if(!roomExists){
      await prisma.room.create({
        data:{
          roomId:roomId,
          user:{
            connect:{
              id:userId
            }
          }
        }
      })
    }
    else {
      await prisma.room.update({
        where:{
          roomId:roomId
        },
        data:{
          user:{
            connect:{
              id:userId
            }
          }
        }
      })
    }
    
  
  
  }
  else {
    return "user already exists"
  }
  console.log("user added")
} catch (error) {
  console.log(error)
}
}


async function addChat({username,message,roomId}:any){
  try {
    await prisma.chat.create({
      data:{
        message:message,
        user:{
          connect:{
            username:username
          }
        },
        room:{
          connect:{
            roomId:roomId
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
  }

}