const { log } = require('console');
const express = require('express');
const app = express();

//servidor do node, em vez do express
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.get('/', (eq, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('SOCKET INSTANCE', socket.id);
    socket.on('welcome', (data) => {
        console.log('EVENTO DO CLIENTE CHEGOU NO SERVIDOR ', data);
    });
    socket.on('palavra', (data) => {
        socket.emit('resultado', data)
        console.log('Palavra recebida:', data);
    });
});



http.listen(5000, () => {
    console.log('servidor rodando: http://localhost:5000');
});
