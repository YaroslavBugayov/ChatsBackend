import { Server as SocketIOServer, Socket } from 'socket.io';
import { app } from './app';
import http from "http";
import dotenv from 'dotenv';

dotenv.config();

const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} connected`);

    // socket.emit('message', JSON.stringify({ users: ['Dave', 'Emma', 'John', 'Peter'] }));

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
});

export { server, io };