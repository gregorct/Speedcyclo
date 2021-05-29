import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// Rutas
import usersRoutes from './routes/users.js'
import sessionsRoutes from './routes/sessions.js'

import http from 'http'
import {Server} from 'socket.io'

import dotenv from 'dotenv'
import path from 'path'

// Gestor de salas
import {
    startRooms, 
    getRooms, 
    getRoomValues,
    joinUser,
    leaveUser,
    updateUserValues
    } from './Rooms.js'


const app = express()
const server = http.createServer(app)
const io = new Server(server)
dotenv.config()

startRooms()



io.on("connection", (socket) => {

    // Nuevo socket
    const {type, roomId, username} = socket.handshake.query
    if(type == "system"){
        socket.emit("listRooms", getRooms())
    }

    if(type == "user"){
        if(joinUser(roomId, socket.id, username)){
            socket.join(roomId)
            io.emit("listRooms", getRooms())
            io.in(roomId).emit("newValues", getRoomValues(roomId))
            io.in(roomId).emit("userConnected", username)
        } else {
            socket.emit("fullRoom")
        } 
    }
    
    // Escuchando nuevos valores
    socket.on("updateValues", (data) => {
        updateUserValues(roomId, socket.id, data)

        io.in(roomId).emit("newValues", getRoomValues(roomId))
    })

    // Salir de la sala
    socket.on("disconnect", () => {
        if(type == "user"){
            
            io.in(roomId).emit("newValues", getRoomValues(roomId))  
            leaveUser(roomId, socket.id)
            io.in(roomId).emit("userDisconnected", username)
            io.emit("listRooms", getRooms())         
            socket.leave(roomId)
        }
        
    })
})




app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Configuración de rutas
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "./client/build")))

app.use((req, res, next) => {
    if(!req._parsedUrl.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, "./client/build/index.html"))
    }else{
        next()
    }
        
  })

app.use('/api/users', usersRoutes)
app.use('/api/sessions', sessionsRoutes)


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => server.listen(PORT, console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)