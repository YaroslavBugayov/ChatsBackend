import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';

interface Room {
    id: string;
    name: string;
    users: string[]
}

const users: string[] = [];
const rooms: Room[] = [];
// {id: "555", name: "test1", users: ['Dave', 'Michale', 'John']}, {id: "666", name: "test2", users: []}

export const handleSocketConnection = (socket: Socket, io: Server ) => {
    const currentUser = socket.handshake.query.username as string;

    console.log(`${socket.id}: ${currentUser} connected`);

    if (!currentUser) {
        console.log('Username not found');
    } else {
        users.push(currentUser);

        io.emit('users', JSON.stringify({ users: users }) as any);
    }
    socket.emit('rooms', JSON.stringify({ rooms: rooms }) as any);

    socket.on('disconnect', () => {
        const index = users.indexOf(currentUser);
        if (index > -1) {
            users.splice(index, 1);
        }
        io.emit('users', JSON.stringify({ users: users }) as any);
        console.log(`${socket.id}: ${currentUser} disconnected`);
    });

    socket.on('create-room', ({ name }: { name: string }) => {
        if (rooms.map(room => room.name).includes(name)) {
            socket.emit('error', JSON.stringify({ errorMessage: 'This room already exists' }) as any);
        } else {
            const id = v4();
            rooms.push({ id: id, name: name, users: [] });

            io.emit('rooms', JSON.stringify({ rooms: rooms }));
        }
    });

    socket.on('removeRoom', (id: string) => {
        const index = rooms.findIndex(room => room.id === id);
        if (index > -1) {
            rooms.splice(index, 1);
            io.emit('rooms', JSON.stringify(rooms));
        }
    });
}