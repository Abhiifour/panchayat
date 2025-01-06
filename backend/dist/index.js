"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const httpServer = app.listen(3000);
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
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === 'chat') {
            const userRoom = allSockets.find((x) => x.socket == socket);
            const currRoom = allSockets.filter((x) => x.room == (userRoom === null || userRoom === void 0 ? void 0 : userRoom.room));
            currRoom.forEach((function (x) {
                x.socket.send(parsedMessage.payload.message);
            }));
        }
    });
    console.log('Client connected');
});
