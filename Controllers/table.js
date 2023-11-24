function getAllSteps(){
    let tbody = document.querySelector('tbody');
    let sumSteps = document.querySelector('#sumSteps');

    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        let i = 0;
        
        res.data.sort((a,b) => a.date.localeCompare(b.date));
        res.data.forEach(item => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');

            i++;
            

            td1.innerHTML = i + '.';

            td2.innerHTML = item.date.split('T')[0];
            if (item.type == 1) {
                td3.innerHTML = item.amount;
            }
            else{
                td3.innerHTML = -item.amount;
            }
            td3.classList.add('text-end');
            let category = "";
            axios.get(`${serverURL}/catgs/ID/eq/${item.tag}`).then(rest=>{
                category = rest.data[0].tagname;
                td4.innerHTML = category;
                td4.classList.add('text-end');
            })

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
        });

        sumSteps.innerHTML = sum;
    })
}

function renderData(){
    setTimeout(()=>{getAllSteps();}, 200);
}