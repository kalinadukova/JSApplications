let userData = null;
let tableBody = document.querySelector('tbody');

window.addEventListener('DOMContentLoaded', () => {
  userData = JSON.parse(sessionStorage.getItem('userData'));
  
  if (userData != null) {
    console.log(userData);

    loadAllFurniture();

    [...document.querySelectorAll('[type="checkbox"]')].map(el => el.disabled = false);

    document.getElementById('createProduct').addEventListener('submit', onCreate);

    document.getElementById('buy').addEventListener('click', onBuy);

    document.getElementById('logoutBtn').addEventListener('click', onLogout);

    document.querySelector('.orders button').addEventListener('click', onAllOrders);
  } else {
    loadAllFurniture();
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

    ev.target.reset();

    addToTable(data);

  } catch (error) {
    alert(error.message)
  }
}

async function onBuy() {
  const checkboxBtn = [...document.querySelectorAll('[type="checkbox"]')];

  const products = [];

  checkboxBtn.forEach(element => {
    if (element.checked) {
      products.push(element.id);
    }
  })

  const url = 'http://localhost:3030/data/orders';

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': userData.token
    },
    body: JSON.stringify({
      products: products
    })
  };

  const res = await fetch(url, options);
  const data = await res.json();

}


async function onAllOrders(ev) {
  const allOrdersDiv = document.querySelector('.orders');
  const divChildren = allOrdersDiv.children;
  
  const boughtSpan = divChildren[0].children[0];
  const priceSpan = divChildren[1].children[0];

  let boughtFurniture = [];
  let sum = 0;

  const url = 'http://localhost:3030/data/orders';
  const res = await fetch(url);
  const data = await res.json();

  for (const element of data) {
    if (element._ownerId == userData.id) {
      element.products.forEach(id => {
        let tableRow = document.getElementsByClassName(`${id}`)[0];
        let name = tableRow.children[1].children[0].textContent;
        let price = Number(tableRow.children[2].children[0].textContent);
        sum += price;
        boughtFurniture.push(name);
      });
      
    }

    boughtSpan.textContent = boughtFurniture.join(', ');
    priceSpan.textContent = sum;
  }
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
    <tr class="${data._id}">
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
        <input type="checkbox" id="${data._id}"/>
    </td>
    </tr>
    `;
}

async function loadAllFurniture() {
  const url = 'http://localhost:3030/data/furniture'; 
  const res = await fetch(url);
  const data = await res.json();

  data.forEach(element => addToTable(element));
}
