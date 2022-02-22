let userData = null;

window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        document.getElementById('guest').style.display = 'none';
        document.querySelector('.email span').textContent = userData.email;
        document.querySelector('#addForm fieldset button').disabled = false;

    } else {
        document.getElementById('user').style.display = 'none';
        document.querySelector('#addForm fieldset .add').disabled = true;
    }

    const loadBtn = document.querySelector('.load');
    loadBtn.addEventListener('click', loadAllCatches);

    const addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', addCatch);

    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click', onLogout);

});

async function loadAllCatches() {
    const url = 'http://localhost:3030/data/catches';
    const res = await fetch(url);
    const data = await res.json();

    document.getElementById('catches').innerHTML = '';

    data.forEach(element => {
        const divElement = createCatch(element);
        document.getElementById('catches').appendChild(divElement);
    });

    const updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach(btn => {
        if (btn.disabled == false) {
            btn.addEventListener('click', updateCatch);
        }
    });

    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(btn => {
        if (btn.disabled == false) {
            btn.addEventListener('click', deleteCatch);
        }
    });
}

async function addCatch(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    console.log(formData.get('angler'));

    try {
        const url = 'http://localhost:3030/data/catches';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({
                angler: formData.get('angler'),
                weight:formData.get('weight'),
                species:formData.get('species'),
                location: formData.get('location'),
                bait: formData.get('bait'),
                captureTime: formData.get('captureTime')
            })
        };

        const res = await fetch(url, options);

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

    } catch (error) {
        alert(error.message);
    }
}

function createCatch(item) {
    const isOwner = (userData && (userData.id == item._ownerId));

    const divElement = document.createElement('div');
    divElement.className = 'catch';
    divElement.innerHTML = `
    <label>Angler</label>
    <input type="text" class="angler" value="${item.angler}" ${isOwner ? '' : 'disabled'}>
    <label>Weight</label>
    <input type="text" class="weight" value="${item.weight}" ${isOwner ? '' : 'disabled'}>
    <label>Species</label>
    <input type="text" class="species" value="${item.species}" ${isOwner ? '' : 'disabled'}>
    <label>Location</label>
    <input type="text" class="location" value="${item.location}" ${isOwner ? '' : 'disabled'}>
    <label>Bait</label>
    <input type="text" class="bait" value="${item.bait}" ${isOwner ? '' : 'disabled'}>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${item.captureTime}" ${isOwner ? '' : 'disabled'}>
    <button class="update" data-id="${item._id}" ${isOwner ? '' : 'disabled'}>Update</button>
    <button class="delete" data-id="${item._id}" ${isOwner ? '' : 'disabled'}>Delete</button>
    `;

    return divElement;
}

async function onLogout() {
    const url = 'http://localhost:3030/users/logout';
    const res = await fetch(url, {
        method: 'get',
        headers: {
            'X-Authorization': userData.token
        }
    });

    if (res.status == 204) {
        sessionStorage.clear();
        window.location = '/index.html';
    } else {
        console.error(await res.json());
    }
}

async function updateCatch(ev) {
    const button = ev.target;
    const id = button.dataset.id;
    
    const url = `http://localhost:3030/data/catches/${id}`;
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        }
    });

    const data = await res.json();

}

async function deleteCatch(ev) {
    const button = ev.target;
    const id = button.dataset.id;
    
    const url = `http://localhost:3030/data/catches/${id}`;

    const res = await fetch(url, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    });

    const data = await res.json();

    button.parentNode.remove();
}