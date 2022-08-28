//depenedencies
var socket = io();

//elements
const chatbox = document.getElementById("primary-chat-container");
const msglist = document.getElementById("msglist");
const msginput = document.getElementById('chat-textinput')
const msgsend = document.getElementById("chat-sendinput")
const listencount = document.getElementById('connectioncount')
//toggle chat
chatbox.style.display = "none"
document.getElementById("chat-button").onclick = ()=>{
    if (chatbox.style.display != "none") {
        chatbox.style.display = "none"
    }else {
        chatbox.style.display = "block"
    }
}

//send message functionality
function sendmessage() {
    if (msginput.value === "") return false
    socket.emit('chat-message-receive', {name: "any", content: msginput.value})
    msginput.value = "";
}

//Send Message
msgsend.onclick = ()=>{sendmessage()};
document.onkeyup = (key)=>{ if (key.code == "Enter") sendmessage()}


//Recieve Message
socket.on('chat-message-receive', (msg)=> {
    const time = new Date();
    const parsedtime = time.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
      });

    let chatmsg = document.createElement('li');
    chatmsg.classList.add("msg")

    let nmtmcont = document.createElement('div')
    nmtmcont.classList.add("nmtm-cont");
    chatmsg.appendChild(nmtmcont);

    let msgname = document.createElement("h6")
    msgname.classList.add("msgname")
    msgname.innerText = msg.name

    let msgtime = document.createElement("h6")
    msgtime.classList.add("msgtime")
    msgtime.innerText = parsedtime
    
    nmtmcont.appendChild(msgname)
    nmtmcont.appendChild(msgtime)

    let msgcontent = document.createElement('h6');
    msgcontent.classList.add("msgcontent");
    chatmsg.appendChild(msgcontent);
    msgcontent.innerText = msg.content

    msglist.appendChild(chatmsg);

    msglist.scroll({top: msglist.scrollHeight, behavior:"smooth" })
})

//listener change
socket.on('connectionChange', connections=>{
    listencount.innerText = connections
})

/* Templates
    message template

  <li class="msg">
        <div class="nmtm-cont">
            <h6 class="msgname">Lorem</h6>
            <h6 class="msgtime">12:23pm</h6>
        </div>
        <h6 class="msgcontent">content here</h6>
  </li>



*/