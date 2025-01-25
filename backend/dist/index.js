"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const httpServer = app.listen(3001);
const wsServer = new ws_1.WebSocket.Server({ server: httpServer });
let allSockets = [];
wsServer.on('connection', (socket) => {
    socket.on('error', (error) => console.log(error));
    socket.on('message', (message) => {
        // wsServer.clients.forEach(function each(client) {
        //     if (client !== socket && client.readyState === WebSocket.OPEN) {
        //       client.send(message, {binary: isBinary});
        //       //console.log(client)
        //     }
        // });
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                username: parsedMessage.payload.username,
                avatarUrl: parsedMessage.payload.avatarUrl
            });
            const userInRoom = allSockets.filter((x) => x.room === parsedMessage.payload.roomId);
            // addUserAndRoom({username:parsedMessage.payload.username,avatarUrl:parsedMessage.payload.avatarUrl,roomId:parsedMessage.payload.roomId})
            userInRoom.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "join",
                    payload: {
                        usersAvailable: userInRoom.length,
                        joined: `${parsedMessage.payload.username} has joined the room`
                    }
                }));
            });
            // const userRoom = allSockets.find((x) => x.socket == socket)
            // const currRoom = allSockets.filter((x) => x.room == userRoom?.room)
            // let usersInRoom = [];
            // currRoom.forEach((function(x){
            //   usersInRoom.push(x.username)
            //   x.socket.send(JSON.stringify(usersInRoom))
            // }))
        }
        if (parsedMessage.type === "chat") {
            const userRoom = allSockets.find((x) => x.socket == socket);
            const currRoom = allSockets.filter((x) => x.room == (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room));
            currRoom.forEach((function (x) {
                x.socket.send(JSON.stringify({
                    type: "chat",
                    payload: parsedMessage.payload
                }));
            }));
            // addChat({username:parsedMessage.payload.username,message:parsedMessage.payload.message,roomId:parsedMessage.payload.roomId})
        }
        if (parsedMessage.type === "close") {
            const userRoom = allSockets.find((x) => x.socket == socket);
            const currRoom = allSockets.filter((x) => x.room == (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room));
            currRoom.forEach((x) => {
                x.socket.send(JSON.stringify({
                    type: "close",
                    payload: `${userRoom === null || userRoom === void 0 ? void 0 : userRoom.username} has left the room`
                }));
            });
        }
        socket.on("close", () => {
            const user = allSockets.find((x) => x.socket == socket);
            const temp = allSockets.filter((x) => x == user);
            allSockets = temp;
        });
    });
    console.log('Client connected');
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const avatarUrl = req.body.avatarUrl;
    try {
        yield prisma.user.create({
            data: {
                username: username,
                avatar: avatarUrl
            }
        });
    }
    catch (error) {
        return res.json({
            msg: error
        });
    }
    res.json({
        msg: "hi there!!"
    });
}));
function addUserAndRoom(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, avatarUrl, roomId }) {
        try {
            const userExists = yield prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if (!userExists) {
                const user = yield prisma.user.create({
                    data: {
                        username: username,
                        avatar: avatarUrl
                    }
                });
                const userId = user.id;
                const roomExists = yield prisma.room.findFirst({
                    where: {
                        roomId: roomId
                    }
                });
                if (!roomExists) {
                    yield prisma.room.create({
                        data: {
                            roomId: roomId,
                            user: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    });
                }
                else {
                    yield prisma.room.update({
                        where: {
                            roomId: roomId
                        },
                        data: {
                            user: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    });
                }
            }
            else {
                return "user already exists";
            }
            console.log("user added");
        }
        catch (error) {
            console.log(error);
        }
    });
}
function addChat(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, message, roomId }) {
        try {
            yield prisma.chat.create({
                data: {
                    message: message,
                    user: {
                        connect: {
                            username: username
                        }
                    },
                    room: {
                        connect: {
                            roomId: roomId
                        }
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
