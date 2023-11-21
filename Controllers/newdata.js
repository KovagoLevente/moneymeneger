function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addSteps(){

    let date = document.querySelector('#date');
    let item = document.querySelector('#item');

    if (date.value == "" || item.value == 0 ){
        showMessage("Nem adtál meg minden adatot!");
    }
    else{
        axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
            let vane = false;
            let upID = -1;
            res.data.forEach(item => {
                if (item.date.split('T')[0] == date.value){
                    vane = true;
                    upID = item.ID;
                    return;
                }
            });
            if(vane){
                let data = {
                    item : item.value	
                }
                axios.patch(`${serverURL}/items/ID/eq/${upID}`, data).then((res)=>{
                    alert('A bevétel/kiadás módosítva!');
                    date.value = null;
                    item.value = 0;
                });
            }
            else{
                let data = {
                    userID : loggedUser.ID,	
                    date : date.value,	
                    item : item.value	
                }

                axios.post(`${serverURL}/items`, data).then((res)=>{
                    alert('A bevétel/kiadás rögzitve!');
                    date.value = null;
                    item.value = 0;
                });
            }
        })
    }
}

getToday();
