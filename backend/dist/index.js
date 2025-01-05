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
wsServer.on('connection', (socket) => {
    socket.on('error', (error) => console.log(error));
    socket.on('message', (message, isBinary) => {
        wsServer.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === ws_1.WebSocket.OPEN) {
                client.send(message, { binary: isBinary });
            }
        });
    });
    console.log('Client connected');
});
