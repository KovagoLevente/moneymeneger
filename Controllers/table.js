function getAllSteps(){
    let tbody = document.querySelector('tbody');
    
    
    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        let i = 0;
        
        axios.get(`${serverURL}/catgs/ID/eq/${item.tag}`).then(catDATA => {
            
            
            let category = "";
        
            res.data.sort((a,b) => a.date.localeCompare(b.date));
            res.data.forEach(item => {
                let tr = document.createElement('tr');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');

                i++;
                category = catDATA.data[0].tagname;

                td1.innerHTML = i + '.';

                td2.innerHTML = item.date.split('T')[0];

                td3.innerHTML = category;
                td3.classList.add('text-end');

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);

            });
        })
       
    })
}

function renderData(){
    setTimeout(()=>{getAllSteps();}, 500);
}