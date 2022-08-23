var socket = io();

function addmesage(content, ips) {
    const cont = document.getElementById("msgs")
    var current = new Date();
    document.getElementById("msgs").innerHTML = document.getElementById("msgs").innerHTML + 
    `<li class="msg">
        <h6 class="name">${content.name}</h6><h6 class="timestamp">${current.toLocaleTimeString()}</h6>
        <p class="msgcontent">${content.content}</p>
    </li>`
    cont.scroll({top: cont.scrollHeight, behavior:"smooth" })
}

document.getElementById("submission").onclick = function() {
    updatecontent()
}

document.addEventListener("keyup", function(event) {
    switch(event.key) {
        case "Enter":
            updatecontent();
        case "/":
            document.getElementById("textinput").focus();
    }


});
function updatecontent() {
    const content = document.getElementById("textinput").value
    if (content == "") return false
    socket.emit('chtmsg', {content: content, name: "" })
    document.getElementById("textinput").value = "";
}

socket.on('chtmsg', function(msg) {
    addmesage(msg)
});

socket.on('updatelisten', (count)=>{
    document.getElementById('lstncount').innerText = `${count} Users Listening`
})