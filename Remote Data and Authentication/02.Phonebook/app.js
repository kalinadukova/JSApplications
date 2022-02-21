const loadBtn = document.getElementById('btnLoad');
const createBtn = document.getElementById('btnCreate');
const phonebookList = document.getElementById('phonebook');

attachEvents();

function attachEvents() {
    loadBtn.addEventListener('click', loadPhonebook);
    createBtn.addEventListener('click', createPhone);
}

async function loadPhonebook() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    const phonebook = Object.values(data);

    phonebookList.innerHTML = '';

    for (const element of phonebook) {
        let liElement = document.createElement('li');
        liElement.innerHTML = `${element.person}: ${element.phone} <button class="deleteBtn">Delete</button>`;
        liElement.id = element['_id'];
        phonebookList.appendChild(liElement);
    }

    const deleteButtons = [...document.getElementsByClassName('deleteBtn')];
    deleteButtons.forEach(btn => { btn.addEventListener('click', deletePhone) });
    
}

async function addPhone(phone) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phone)
    };
    const res = await fetch(url, options);
}

async function createPhone() {
    const nameValue = document.getElementById('person').value;
    const phoneValue = document.getElementById('phone').value;

    await addPhone({ person: nameValue, phone: phoneValue });
}

async function deletePhone(event) {
    const btn = event.target;
    const liElement = btn.parentNode;
    const id = liElement.id;
    console.log(id);

    await deletePhoneById(id);

    liElement.remove();
    
}

async function deletePhoneById(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/${id}`;
    const res = await fetch(url, {
        method: 'delete'
    });
    const data = await res.json();
}

