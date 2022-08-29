//json url
jsonurl="/json/announcements-schedule.json"
//Elements
const schedulelist = document.getElementById("schedule");
const announcementlist = document.getElementById("announcements")

function makeScheduleEvent(title, time, date) {
    let event = document.createElement('div');
    event.classList.add("event");

    let etitle = document.createElement('div');
    etitle.classList.add('eventtitle');
    event.appendChild(etitle)
    etitle.innerText = title;

    let etime = document.createElement('div');
    etime.classList.add('eventtime');
    event.appendChild(etime)
    etime.innerText = time;

    let edate = document.createElement('div');
    edate.classList.add("eventdate");
    event.appendChild(edate)
    edate.innerText = date

    return event
}

function makeAnnouncement(title, date) {
    let event = document.createElement('div');
    event.classList.add("event");

    let etitle = document.createElement('div');
    etitle.classList.add('eventtitle');
    event.appendChild(etitle)
    etitle.innerText = title;


    let etime = document.createElement('div');
    etime.classList.add('eventtime');
    event.appendChild(etime)
    etime.innerText = date;

    return event
}



fetch(jsonurl).then(data=>data.json()).then(data=>{
    //announcements
    const anns = data.announcements;
    for (i in anns) {
        let an = anns[i]
        announcementlist.appendChild(makeAnnouncement(an.title, an.date))
    }

    //schedule
    const sch = data.schedule;
    for (i in sch) {
        console.log(sch)
        let sc = sch[i]
        console.log(sc)
        schedulelist.appendChild(makeScheduleEvent(sc.title,sc.time,sc.date))
    }



})


/*

<div class="event">
                    <div class="eventtitle">Title showing what this episode is about, and other things</div>
                    <div class="eventtime">9:00PM - 10:00PM</div>
                    <div class="eventdate">Friday, September 24</div>
                </div>
    */