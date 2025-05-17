const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));





io.on("connection",(socket)=>{
console.log("connection done");  // this is for making connection

socket.on("joined",(name)=>{
    users = name; // ✅ Add this line
  console.log(name+"joined the chat ");
  io.emit("joined",`${name} joined the chat`);
})




socket.on("usermsg",(massege)=>{     // this is to catch request from frontend
  
  
  io.emit("massege", massege); // this is used to send msg to everyone and we will catch this is frontend
})

socket.on("disconnect", () => {
   const name = users;
   if (name) {
     socket.broadcast.emit("joined", `${name} left the chat`);
     delete users[socket.id]; // clean up
   }
 });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});
