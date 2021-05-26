const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const { addUser, getUsersInRoom, removeUser } = require('./utils/user')
const { generateMessage } = require('./utils/message')
const { measureMemory } = require('vm')

const app = express()
const server = http.createServer(app)
const corsOptions={
    cors: true,
    origins:["http://localhost:3000"],
   }
const io = socketio(server, corsOptions);



app.use(cors())
app.get('/',(req,res)=>{
    res.send({response : "Server is ready !"}).status(201);
})

const port = process.env.PORT || 5000


io.on('connect',(socket)=>{

    // IF user joins the room
    socket.on('join',({username,room},callback)=>{

        const {error,user} = addUser({id:socket.id,username,room})
        if(error){
            return callback(error);
        }
        socket.join(user.room)
         // Noticing all the room someone has entered except to him
        socket.emit('message',generateMessage('Admin','Welcome'));
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined`))
        io.to(user.room).emit('roomData',{
            room : user.room,
            users : getUsersInRoom(user.room)
        })
        callback();
    })

    socket.on('sendMessage',(clientmsg,callback)=>{
        const {username,message,room} = clientmsg
        console.log(generateMessage(username,message));
        io.to(room).emit('message',generateMessage(username,message))
        callback();
    })



    // IF user disconnects
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){ 
            io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`))
            io.to(user.room).emit('roomData',{
                room : user.room,
                users : getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})