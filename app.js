//Library Dependenciies
const express = require("express");
const { Server } = require("socket.io");
const http = require('http')
const fs = require("fs");
const { emit, listeners, disconnect } = require("process");

//Connection Tracker
var connections = 0;

//Settings
const port = 80;
/*<--- set dynamic rendering --->*/
//Server initialization (with socketio)
const app = express();
const server = http.createServer(app);
const io = new Server(server);
//uses ejs view engine for dynamic webpaging
app.set('view engine','ejs');
// Renders html pages
app.engine('html', require('ejs').renderFile);
//Host static files in "/public"
app.use(express.static('public', {extensions: ["html"]}))

//set views
app.set('views', __dirname + '/public/html')


//Route "/" to home.html dynamically
app.get('/', (req, res)=>{
     res.render("home.html")
    })


//Socket.io routing
io.on('connection', (connection)=> {
    var address = connection.handshake.address;
    connections += 1
    connection.on('chat-message-receive', msg =>{
        msg.name = address.replace("::ffff:", "")
        io.emit('chat-message-receive', msg )
    })
    io.emit('connectionChange', connections)

    connection.on('disconnect', ()=>{
        connections -= 1
        io.emit('connectionChange', connections)
    })

    })


//Start server listening
server.listen(port, ()=>{
    console.log('Server listening on port:', port)
})