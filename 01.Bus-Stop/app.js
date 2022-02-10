function getInfo() {
    let busID = document.getElementById('stopId').value;
    let url = `http://localhost:3030/jsonstore/bus/businfo/${busID} `;
    let stopName = document.getElementById('stopName');
    let ulList = document.getElementById('buses');

    fetch(url)
        .then(res => {
            if(res.status != 200) {
                throw new Error(`Error`);
            }
            return res.json();
        })
        .then(addBusInfo)
        .catch(handleError);

    function addBusInfo(data) {
        ulList.innerHTML = '';
        stopName.textContent = data.name;
        for (const bus in data.buses) {
            let liElement = document.createElement('li');
            liElement.textContent = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
            ulList.appendChild(liElement);
        }
    }

    function handleError(error) {
        ulList.innerHTML = '';
        stopName.textContent = error.message;
    }
}