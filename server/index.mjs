import express from "express";
import http from "http";
import cors from "cors";
import {Server} from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("connected")

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user entered ${data} with ${socket.id}`)
    })

    socket.on("send_message",(data)=>{
       socket.to(data.room).emit("recieve_message",data)
        console.log("data",data)
    })

    socket.on("disconnect",()=>{
        console.log("disconnected")
    })

})



server.listen(3001, () => {
  console.log("server listening on port 3001");
});
