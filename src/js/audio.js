let playing = false;
let loaded = false;


//stream urls
const streamDomain = "http://ismaradio.ddns.net:25565";
const xslURL = streamDomain + "/status-json.xsl" 
const streamLink = streamDomain+ "/stream"

//constant elements
const mediacontrol = document.getElementById("mediacontrol")
var audio;
const loading = document.getElementById("Loading")
const timestamp = document.getElementById("audiotime")

//loading animation
var dotcount = 0;
const base = "Loading Stream"
function updateloadcount() {
    if (loaded) {return true}
    var tempcount = base;
    for (var i = 0;i<dotcount;i++) {
        tempcount = tempcount + " .";
    }
    loading.innerText = tempcount;
    loading.style.color = "#ffffff"
    dotcount += 1
    if (dotcount > 3) {
        dotcount = 0
    }
    setTimeout(()=>{updateloadcount()}, 1000)
}

//Load Audio function
function loadAudio() {
    //Set bool to false
    playing = false;
    loaded = false
    //create new audio (delete last audio if resetting)
    audio = new Audio(streamLink);

    //Make loader visible
   
    loading.style.display = "block";
    updateloadcount();
    //wait for loaded metadata
    audio.addEventListener('loadedmetadata', ()=> {
        loaded = true;
    
        //autoplay
        playing = true
        mediacontrol.src = "img/pause.png"
        audio.play();
    
    
        loading.innerText = "Stream Loaded Sucessfully!";
        loading.style.color = "rgb(25, 200, 25)"
        setTimeout(()=>{loading.style.display = "none"},2000)

        setInterval(() => {
            if (!loaded) {return false}
            fetch(xslURL)
                .then((res) => res.json())
                .then((data) => {
                    let currentTime = Date.now();
                    timeStart = new Date(data.icestats.server_start).getTime();
                    let subtract = currentTime - timeStart;
                    timestamp.innerText = returnParsed(subtract);
        
                }).catch((err) => {
                    console.log(err)
            });
        }, 1000);

    })
}
loadAudio()


//pause/play
mediacontrol.onclick = () => {
    if (playing) {
        mediacontrol.src = "img/play.png"
        playing = false
        audio.pause()
        return true
    }

    if (loaded && !playing) {
        playing = true
        mediacontrol.src = "img/pause.png"
        audio.remove();
        loadAudio();
   
        audio.play();
    }else {
        mediacontrol.src = "img/play.png"
        playing = false
        return true
    }
    
   
}



//fetch timestamp
function returnParsed(times) {
    let time = times/1000
    let parsedTime = [
        Math.floor(time / 60 / 60).toString(),
        Math.floor((time / 60) % 60).toString(),
        Math.floor(time % 60).toString()
    ];
    for (let i = 0; i < 3; i++) {
        if (parsedTime[i].length === 1) {
            parsedTime[i] = `0${parsedTime[i]}`
        }
    }
    let parsedTimes = `${parsedTime[0]}:${parsedTime[1]}:${parsedTime[2]}`
    return parsedTimes
} 



