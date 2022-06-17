const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('chat message', (msg) => {
        console.log(socket.id);
        socket.broadcast.emit(msg);
      });
});

app.get('/sockets',(req,res)=>{
    io.on("connection", (socket) => {
        console.log(socket.rooms); // Set { <socket.id> }
      });
})



server.listen(4000, () => {
  console.log('listening on *:4000');
});