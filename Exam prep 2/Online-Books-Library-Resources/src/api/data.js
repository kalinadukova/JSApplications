import * as api from "./api.js";

const login = api.login;
const register = api.register;
const logout = api.logout;

//other requests

async function getAllBooks() {
  return api.get("/data/books?sortBy=_createdOn%20desc");
}

async function createBook(data) {
  return api.post("/data/books", data);
}

async function getBookById(id) {
  return api.get(`/data/books/${id}`);
}

async function editBook(id, data) {
  return api.put(`/data/books/${id}`, data);
}

async function deleteBook(id) {
  return api.del(`/data/books/${id}`);
}

async function getUserBooks(id) {
  return api.get(
    `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`
  );
}

async function addALike(bookId) {
  return api.post("/data/likes", { bookId });
}

async function getBookLikes(id) {
  return api.get(
    `/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`
  );
}

async function isBookLiked(bookId, userId) {
  return api.get(
    `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export {
  login,
  register,
  logout,
  getAllBooks,
  createBook,
  getBookById,
  editBook,
  deleteBook,
  getUserBooks,
  addALike,
  getBookLikes,
  isBookLiked,
};
