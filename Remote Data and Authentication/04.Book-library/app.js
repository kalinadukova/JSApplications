const loadBtn = document.getElementById('loadBooks');
const tableBody = document.querySelector('table tbody');
const mainForm = document.getElementById('main-form');
const editForm = document.getElementById('edit-form');

loadBtn.addEventListener('click', loadAllBooks);
mainForm.addEventListener('submit', submitBook);
editForm.addEventListener('submit', submitEditedBook);


//Load books
async function loadAllBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url);
    const data = await res.json();

    const books = Object.entries(data);

    tableBody.innerHTML = '';

    for (const element of books) {
        tableBody.innerHTML += `
        <tr id="${element[0]}">
        <td>${element[1].title}</td>
        <td>${element[1].author}</td>
        <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
        </tr>
        `;
    }

    const editBtns = [...document.getElementsByClassName('edit')];
    const deleteBtns = [...document.getElementsByClassName('delete')];
    editBtns.forEach(btn => btn.addEventListener('click', editBook));
    deleteBtns.forEach(btn => btn.addEventListener('click', deleteBook));
}

//Submit book

async function submitBook(ev) {
    ev.preventDefault();

    editForm.style.display = 'none';
    mainForm.style.display = 'block';

    const formData = new FormData(mainForm);

    mainForm.reset();

    const book = {
        author: formData.get('author'),
        title: formData.get('title')
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    };

    const url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url, options);
    const data = await res.json();

    tableBody.innerHTML += `
        <tr id="${data._id}">
        <td>${data.title}</td>
        <td>${data.author}</td>
        <td>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </td>
        </tr>
        `;
}

//Edit book

async function submitEditedBook(ev) {
    ev.preventDefault();

    const formData = new FormData(editForm);

    const id = editForm.dataset.id;

    const book = {
        author: formData.get('author'),
        title: formData.get('title')
    };

    await updateBookById(id, book);

    const tableRow = document.getElementById(id);
    const tableColumns = tableRow.children;

    tableColumns[0].textContent = book.title;
    tableColumns[1].textContent = book.author;

    editForm.style.display = 'none';
    mainForm.style.display = 'block';
}

async function editBook(ev) {
    editForm.style.display = 'block';
    mainForm.style.display = 'none';

    const btn = ev.target;
    const tableRow = btn.parentNode.parentNode;
    const id = tableRow.id;
    const tableChildren = tableRow.childNodes;

    editForm.dataset.id = id;
       
    editForm.querySelector('[name="title"]').value = tableChildren[1].textContent;
    editForm.querySelector('[name="author"]').value = tableChildren[3].textContent;
    
}

async function updateBookById(id, book) {
    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    };

    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    const res = await fetch(url, options);

    const data = await res.json();
}

//Delete book

async function deleteBook(ev) {
    const btn = ev.target;
    const tableRow = btn.parentNode.parentNode;
    const id = tableRow.id;

    await deleteBookById(id);

    tableRow.remove();

}

async function deleteBookById(id) {
    const url = `http://localhost:3030/jsonstore/collections/books/${id}`;
    const res = await fetch(url, {
        method: 'delete'
    });

    return res;
}