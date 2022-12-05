const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')

const cors = require('cors')
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin :"http://localhost:3000",
        METHODS : ["GET","POST"],
    },
})
io.on("connection",(socket)=>{
//console.log(`User is Connected ${socket.id}`);
  socket.on("join-room",(data)=>{
    
    socket.join(data)

  })
  socket.on("send-msg",(data)=>{
    //console.log(data);
    //socket.broadcast.emit("reseive-msg",data);
    socket.to(data.room).emit("reseive-msg",data)
    
})
})

server.listen(3001,()=>{
    console.log('app is runnng')
})