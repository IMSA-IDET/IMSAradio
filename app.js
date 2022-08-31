//Library Dependenciies
const express = require("express");
const { Server } = require("socket.io");
const http = require('http')
const bodyParser = require('body-parser')
const fs = require("fs");
const { json } = require("body-parser");
require("dotenv").config();

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
app.use(bodyParser.urlencoded({extended: true}))

//set views
app.set('views', __dirname + '/public/html')

//handle hostname change post
app.post('/sethost', (req,res)=> {
    if (req.body.password == process.env.HOSTNAMEPASS) {
       var dat = JSON.parse(fs.readFileSync(__dirname +"/public/json/hostname.json"))
       dat.hostname = req.body.ip
       fs.writeFileSync(__dirname +"/public/json/hostname.json",JSON.stringify(dat))
       res.end(`hostname set to ${req.body.ip}`)
    }else {
        res.end("password invalid")
    }
})


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