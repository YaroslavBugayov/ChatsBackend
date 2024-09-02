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

        io.emit('users', JSON.stringify({ users: users }));
    }
    socket.emit('rooms', JSON.stringify({ rooms: rooms }));

    socket.on('create-room', ({ name }: { name: string }) => {
        if (rooms.map(room => room.name).includes(name)) {
            socket.emit('error', JSON.stringify({ errorMessage: 'This room already exists' }));
        } else {
            const id = v4();
            rooms.push({ id: id, name: name, users: [] });

            io.emit('rooms', JSON.stringify({ rooms: rooms }));
        }
    });

    // socket.on('removeRoom', (id: string) => {
    //     const index = rooms.findIndex(room => room.id === id);
    //     if (index > -1) {
    //         rooms.splice(index, 1);
    //         io.emit('rooms', JSON.stringify(rooms));
    //     }
    // });

    socket.on('join-room', ({ id }: { id: string }) => {
        socket.join(id);
        const room = rooms.find(item => item.id === id);
        if (room) {
            room.users.push(currentUser);
            io.emit('rooms', JSON.stringify({ rooms: rooms }));
            console.log(`User ${currentUser} has joined the room ${id}`);
        } else {
            socket.emit('error', JSON.stringify({ errorMessage: 'Room not found' }));
        }
    });

    socket.on('disconnect', () => {
        removeFromList<string>(users, currentUser);
        io.emit('users', JSON.stringify({ users: users }));

        const activeRooms = rooms.filter((room: Room) => room.users.includes(currentUser));
        if (activeRooms.length > 0) {
            activeRooms.forEach((room: Room) => {
                console.log(`User ${currentUser} has left the room ${room.id}`);
                removeFromList<string>(room.users, currentUser);
            })
        }
        io.emit('rooms', JSON.stringify({ rooms: rooms }));

        console.log(`${socket.id}: ${currentUser} disconnected`);
    });
}

const removeFromList = <T>(list: T[], item: T): boolean => {
    const index = list.indexOf(item);
    if (index > -1) {
        list.splice(index, 1);
        return true;
    }
    return false;
}