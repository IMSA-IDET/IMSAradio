

//conversions
const mountpoint = "/stream"
const xslSuffix= "/status-json.xsl"

//audio store
var audio;

//elements
const mediabutton = document.getElementById("media-button")
const loading = document.getElementById('Loading');
const playpng = "/img/play.png"
const pausepng = "/img/pause.png"


fetch("/json/hostname.json").then(data=>data.json()).then(data=>{
    loading.style.display = "none"
    //initial creation
    audio = createNewAudio(data.hostname,data.port)

    function metadataupdate() {
        audio.play()
        loading.style.display = "none"
        toggleAudioVisuals(audio)
        audio.removeEventListener('loadedmetadata', metadataupdate);
        audio.addEventListener('ended', ()=>{audio.pause(); toggleAudioVisuals(audio)})
    }

    loading.style.display = "block";
    audio.addEventListener('loadedmetadata', metadataupdate)
    
   

    //detect toggle click
    mediabutton.onclick = ()=>{
        if (audio.paused) {
            loading.style.display = "block";
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


