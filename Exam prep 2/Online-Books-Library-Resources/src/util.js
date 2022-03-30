function getUserData() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

function setUserData(data) {
  sessionStorage.setItem("userData", JSON.stringify(data));
}

function clearUserData() {
  sessionStorage.clear();
}

export { getUserData, setUserData, clearUserData };
