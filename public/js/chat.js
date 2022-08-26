//elements
const chatbox = document.getElementById("primary-chat-container")
//toggle chat
chatbox.style.display = "none"
document.getElementById("chat-button").onclick = ()=>{
    if (chatbox.style.display != "none") {
        chatbox.style.display = "none"
    }else {
        chatbox.style.display = "block"
    }
}