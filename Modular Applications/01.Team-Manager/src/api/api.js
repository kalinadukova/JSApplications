import { getUserData, setUserData, clearUserData } from "../util.js";

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
      }
      const err = await res.json();
      throw new Error(err.message);
    }

    if (res.status == 204) {
      return res;
    } else {
      return await res.json();
    }
  } catch (error) {
    // alert(error.message);
    throw error;
  }
}

async function get(url) {
  return await request(url, "get");
}

async function post(url, data) {
  return await request(url, "post", data);
}

async function put(url, data) {
  return await request(url, "put", data);
}

async function del(url) {
  return await request(url, "delete");
}

async function login(data) {
  const res = await post("/users/login", data);
  const userData = {
    email: res.email,
    username: res.username,
    id: res._id,
    token: res.accessToken,
  };

  setUserData(userData);
}

async function register(data) {
  const res = await post("/users/register", data);
  const userData = {
    email: res.email,
    username: res.username,
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
