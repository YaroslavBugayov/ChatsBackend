import { Server as SocketIOServer, Socket } from 'socket.io';
import { app } from './app';
import http from "http";
import dotenv from 'dotenv';
import { v4 } from 'uuid';

dotenv.config();

const users: string[] = [];
const rooms: { [id: string]: string } = {};

const server: http.Server = http.createServer(app);

const io: SocketIOServer = new SocketIOServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket: Socket) => {
    const currentUser = socket.handshake.query.username as string;

    console.log(`${socket.id}: ${currentUser} connected`);

    if (!currentUser) {
        console.log('Username not found');
    } else {
        users.push(currentUser);

        io.emit('users', JSON.stringify({ users: users }) as any);
    }

    socket.on('disconnect', () => {
        const index = users.indexOf(currentUser);
        if (index > -1) {
            users.splice(index, 1);
        }
        io.emit('users', JSON.stringify({ users: users }) as any);
        console.log(`${socket.id}: ${currentUser} disconnected`);
    });

    socket.on('newRoom', (room: string) => {
        const id = v4();
        rooms[id] = room;

        socket.emit('newRoom', {})
    })
});

export { server, io };