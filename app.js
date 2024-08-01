const express = require('express');
const socketio = require("socket.io")
const http = require('http')
const path = require("path")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))


// io.on("connection", (socket) => {
//     socket.on("send-location", (data)=> {
//         io.emit("recieve-location", {id: socket.id, ...data})
//     })
//     socket.on("disconnection", ()=>{
//         io.emit("user-disconnected", socket.id)
//     })
//     console.log("Socket connected")
// })

io.on("connection",function (socket){
    socket.on("send-location",function (data){
        io.emit("recieve-location",{id: socket.id, ...data});
    })
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(9000, () => {
    console.log("Server is running");
})
