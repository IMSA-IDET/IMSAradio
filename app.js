//Library Dependenciies
const express = require("express");
const socket = require("socket.io");
const fs = require("fs")


//Settings
const port = 80;
/*<--- set dynamic rendering --->*/
//Server initialization
const app = express();
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



//Start server listening
app.listen(port, ()=>{
    console.log('Server listening on port:', port)
})