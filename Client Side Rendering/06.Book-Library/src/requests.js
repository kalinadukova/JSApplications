const host = "http://localhost:3030/jsonstore/collections";

async function request(url, method, data) {
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const res = await fetch(host + url, options);

  if (res.ok == false) {
    const error = await res.json();
    alert(error.message);
    throw new Error(error.message);
  }

  return res.json();
}

async function getBooks() {
  return request("/books", "get");
}

async function getBookById(id) {
  return request("/books/" + id, "get");
}

async function createBook(book) {
  return request("/books", "post", book);
}

async function editBook(book, id) {
  return request("/books/" + id, "put", book);
}

async function deleteBook(id) {
  return request("/books/" + id, "delete");
}

export { getBooks, getBookById, createBook, editBook, deleteBook };
