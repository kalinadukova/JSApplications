function solve() {
    let info = document.querySelector('.info');
    const departBtn = document.getElementById('depart'); 
    const arriveBtn = document.getElementById('arrive'); 
    let stopObj = {
        next: 'depot',
    };

    async function depart() {
        departBtn.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stopObj.next}`;

        const res = await fetch(url);
        stopObj = await res.json();
        info.textContent = `Next Stop ${stopObj.name}`;

        
        arriveBtn.disabled = false;

    }

    function arrive() {
        arriveBtn.disabled = true;
        
        info.textContent = `Arriving at ${stopObj.name}`;
        
        departBtn.disabled = false;
        
    }

    return {
        depart,
        arrive
    };
}

let result = solve();