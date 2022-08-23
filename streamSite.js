const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http")
const server = http.createServer(app)
const {Server } = require("socket.io")
const ioserver = new Server(server)

//listener count
var listenercount = 0;

const publicdir = __dirname + "/src";
app.use(express.static(publicdir, {extensions:["html"]}));
app.use(bodyParser.urlencoded({extended:false}));



//chat system implementation, live only
ioserver.on('connection', client => {
    listenercount += 1;
    ioserver.emit('updatelisten', listenercount)
    client.on('chtmsg', (msg) => {
      
        if (msg.content.trim() != "") {
            msg.name = client.handshake.address.toString().replace('::ffff:', '');
         
            ioserver.emit('chtmsg', msg);
        }

    });
    client.on('disconnect', ()=> {
        listenercount -= 1
        ioserver.emit('updatelisten', listenercount)
    })

    
    
});

//listen server
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Server listening at port:`, PORT);
});