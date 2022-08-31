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
        let sc = sch[i]
        schedulelist.appendChild(makeScheduleEvent(sc.title,sc.time,sc.date))
    }



})

