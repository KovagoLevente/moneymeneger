function showCalendar(){
    let myEvents = [];
    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        res.data.forEach(item => {
            console.log(`${item.tag}`);
            let category = ""
            axios.get(`${serverURL}/catgs/ID/eq/${item.tag}`).then(Data => {
                category = Data.data[0].tagname;
                
                myEvents.push({
                    title: `${category}:\n${item.amount}`,
                    start: item.date,
                    allDay: true,
                    backgroundColor: item.type == 0 ? '#B31312' : '#508D69',
                    borderColor: item.type == 0 ? '#B31312' : '#508D69',
                })
            })

            
        });
    });

    setTimeout(()=>{

        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prevYear,prev,next,nextYear today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        },
        initialDate: new Date(),
        navLinks: true, 
        editable: false,
        dayMaxEvents: true, 
        events: myEvents
        });
        
        calendar.render();
    }, 300);
}