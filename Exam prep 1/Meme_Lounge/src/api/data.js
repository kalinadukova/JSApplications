import * as api from "./api.js";

const login = api.login;
const register = api.register;
const logout = api.logout;

//other requests

async function getAllMemes() {
  return api.get("/data/memes?sortBy=_createdOn%20desc");
}

async function loadMeme(id) {
  return api.get("/data/memes/" + id);
}

async function createMeme(data) {
  return api.post("/data/memes", data);
}

async function editMeme(id, data) {
  return api.put(`/data/memes/${id}`, data);
}

async function deleteMeme(id) {
  return api.del(`/data/memes/${id}`);
}

async function userMemes(id) {
  return api.get(
    `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`
  );
}

export {
  login,
  register,
  logout,
  getAllMemes,
  loadMeme,
  createMeme,
  editMeme,
  deleteMeme,
  userMemes,
};
