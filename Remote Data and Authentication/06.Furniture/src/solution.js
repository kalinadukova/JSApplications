let userData = null;
let tableBody = document.querySelector('tbody');

window.addEventListener('DOMContentLoaded', () => {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  
  if (userData != null) {
    console.log(userData);

    [...document.querySelectorAll('[type="checkbox"]')].map(el => el.disabled = false);

    document.getElementById('createProduct').addEventListener('submit', onCreate);

    document.getElementById('buy').addEventListener('click', onBuy);

    document.getElementById('logoutBtn').addEventListener('click', onLogout);
  } else {
    
  }
});

async function onCreate(ev) {
  ev.preventDefault();
  
  const formData = new FormData(ev.target);

  const createData = {
    name: formData.get('name'),
    price: formData.get('price'),
    factor: formData.get('factor'),
    img: formData.get('img'),
  };

  const url = 'http://localhost:3030/data/furniture'; 

  const options = {
    method: 'post', 
    headers: {
      'Content-Type': 'Application/json',
      'X-Authorization': userData.token
    },
    body: JSON.stringify(createData)
  };

  const res = await fetch(url, options);

  try {
    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    console.log(data);

    ev.target.reset();

    addToTable(data);

  } catch (error) {
    alert(error.message)
  }
}

function onBuy() {
  console.log('buy');
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
      window.location = '/home.html';
  } else {
      console.error(await res.json());
  }
}

function addToTable(data) {
  tableBody.innerHTML += `
    <tr>
    <td>
        <img
            src="${data.img}">
    </td>
    <td>
        <p>${data.name}</p>
    </td>
    <td>
        <p>${data.price}</p>
    </td>
    <td>
        <p>${data.factor}</p>
    </td>
    <td>
        <input type="checkbox"/>
    </td>
    </tr>
    `;
}