import { Server as SocketIOServer, Socket } from 'socket.io';
import { app } from './app';
import http from "http";
import dotenv from 'dotenv';

dotenv.config();

const users: string[] = [];

const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket: Socket) => {
    let currentUser: string;
    console.log(`${socket.id} connected`);

    socket.on('username', (username: string) => {
        console.log(username)
        currentUser = username;
        users.push(username);
        io.emit('users', JSON.stringify({ users: users }) as any);
    });

    socket.on('disconnect', () => {
        const index = users.indexOf(currentUser);
        if (index > -1) {
            users.splice(index, 1);
        }
        io.emit('users', JSON.stringify({ users: users }) as any);
        console.log(`${socket.id} disconnected`);
    });
});

export { server, io };