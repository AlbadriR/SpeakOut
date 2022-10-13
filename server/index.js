const express = require('express');
const app = express();
const port = 4000;

const http = require('http').Server(app);
const cors = require('cors');
//const { Socket } = require('engine.io');

app.use(cors());

const sokcetIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

sokcetIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected!`);
    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
      });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: "test",
    });
});

http.listen(port, () => {
    console.log(`Server app listening on http://localhost:${port}`);
});
