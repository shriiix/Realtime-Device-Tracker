const express = require('express');
const app = express();


//socketio boilerplate
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app)
const io = socketio(server);

app.set("View engine","ejs");
app.set(express.static(path.join(__dirname,"public")));



app.get("/",function (req,res){
    res.send("hey");

})


server.listen(3000,()=>console.log(`Server runnig at : 9000`));