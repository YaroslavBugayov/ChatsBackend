import { Server as SocketIOServer, Socket } from 'socket.io';
import { app } from './app';
import http from "http";

const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server);

io.on('connection', (socket: Socket) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
});

export { server, io };