const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const members = {};

io.on('connection', (socket) => {
    console.log('Nouvelle connexion :', socket.id);

    socket.on('user:join', ({ name }) => {
        members[socket.id] = { name, status: 'En ligne' };
        io.emit('members:update', Object.values(members));
        console.log(`${name} a rejoint le board`);
    });

    socket.on('status:change', ({ status }) => {
        if (members[socket.id]) {
            members[socket.id].status = status;
            io.emit('members:update', Object.values(members));
        }
    });

    socket.on('disconnect', () => {
        const member = members[socket.id];
        if (member) {
            console.log(`${member.name} a quitté le board`);
            delete members[socket.id];
            io.emit('members:update', Object.values(members));
        }
    });
});

server.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});