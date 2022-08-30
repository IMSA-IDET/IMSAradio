//conversions
const mountpoint = "/stream"

//audio store
var audio;

//elements
const mediabutton = document.getElementById("media-button")
const playpng = "/img/play.png"
const pausepng = "/img/pause.png"


fetch("/json/hostname.json").then(data=>data.json()).then(data=>{
    
    //initial creation
    audio = createNewAudio(data.hostname,data.port)

    function metadataupdate() {
        audio.play()
        toggleAudioVisuals(audio)
        audio.removeEventListener('loadedmetadata', metadataupdate);
        audio.addEventListener('ended', ()=>{audio.pause(); toggleAudioVisuals(audio)})
    }
    audio.addEventListener('loadedmetadata', metadataupdate)

   

    //detect toggle click
    mediabutton.onclick = ()=>{
        if (audio.paused) {
            audio = createNewAudio(data.hostname,data.port)
            audio.addEventListener('loadedmetadata', metadataupdate)
        }else {
            audio.pause()
        }
        toggleAudioVisuals(audio)
    }


}).catch(err =>{
   console.log(err)
})


function createNewAudio(hostname,port) {
    if (audio != undefined) audio.remove();
    return new Audio(`http://${hostname}:${port}${mountpoint}`);
}


//Toggle Audio
function toggleAudioVisuals(audio) {
    if (audio.ended || audio.paused) {
        mediabutton.src = playpng
    }else {
        mediabutton.src = pausepng
        console.log('what')
    }
}