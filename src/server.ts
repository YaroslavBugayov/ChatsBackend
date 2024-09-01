import { Server as SocketIOServer, Socket } from 'socket.io';
import { app } from './app';
import http from "http";
import dotenv from 'dotenv';
import { handleSocketConnection } from './socket/socketHandler';

dotenv.config();

const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket: Socket) => handleSocketConnection(socket, io));

export { server, io };