import * as api from "./api.js";

const login = api.login;
const register = api.register;
const logout = api.logout;

//other requests

async function createFurniture(data) {
  return api.post("/data/catalog", data);
}

async function getAllFurniture() {
  return api.get("/data/catalog");
}

async function getFurnitureDetails(id) {
  return api.get(`/data/catalog/${id}`);
}

async function updateFurniture(id, data) {
  return api.put(`/data/catalog/${id}`, data);
}

async function deleteFurniture(id) {
  return api.del(`/data/catalog/${id}`);
}

async function getUserFurniture(id) {
  return api.get(`/data/catalog?where=_ownerId%3D%22${id}%22`);
}

export {
  login,
  register,
  logout,
  createFurniture,
  getAllFurniture,
  getFurnitureDetails,
  updateFurniture,
  deleteFurniture,
  getUserFurniture,
};
