import { clearUserData, getUserData, setUserData } from "../util.js";
import { updateNav } from "../app.js";

const host = "http://localhost:3030";

async function request(url, method, data) {
  const userData = getUserData();
  const options = {
    method,
    headers: {},
  };

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }
  try {
    const res = await fetch(host + url, options);

    if (res.ok == false) {
      if (res.status == 403) {
        clearUserData();
        updateNav();
        page.redirect("/");
      }
      const error = await res.json();
      throw new Error(error.message);
    }

    if (res.status === 204) {
      return res;
    } else {
      return res.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

async function get(url) {
  return request(url, "get");
}

async function post(url, data) {
  return request(url, "post", data);
}

async function put(url, data) {
  return request(url, "put", data);
}

async function del(url) {
  return request(url, "delete");
}

async function login(data) {
  const res = await post("/users/login", data);
  const userData = {
    email: res.email,
    id: res._id,
    token: res.accessToken,
  };

  setUserData(userData);
}

async function register(data) {
  const res = await post("/users/register", data);
  const userData = {
    email: res.email,
    id: res._id,
    token: res.accessToken,
  };

  setUserData(userData);
}

async function logout() {
  await get("/users/logout");
  clearUserData();
}

export { get, post, put, del, login, register, logout };
