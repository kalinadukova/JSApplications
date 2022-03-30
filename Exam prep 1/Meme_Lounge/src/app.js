import { logout } from "./api/data.js";
import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { allMemesPage } from "./views/allMemes.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/myProfile.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("main");

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
  updateUserNav();
  page.redirect("/");
});

updateUserNav();

page("/", decorateContex, homePage);
page("/login", decorateContex, loginPage);
page("/register", decorateContex, registerPage);
page("/all-memes", decorateContex, allMemesPage);
page("/create", decorateContex, createPage);
page("/details/:id", decorateContex, detailsPage);
page("/edit/:id", decorateContex, editPage);
page("/my-profile", decorateContex, profilePage);
page.start();

function decorateContex(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.updateUserNav = updateUserNav;
  next();
}

function updateUserNav() {
  const userData = getUserData();
  if (userData == null) {
    [...document.getElementsByClassName("guest")][0].style.display = "block";
    [...document.getElementsByClassName("user")][0].style.display = "none";
    page.redirect("/index.html", "/");
  } else {
    [...document.getElementsByClassName("guest")][0].style.display = "none";
    [...document.getElementsByClassName("user")][0].style.display = "block";

    document.querySelector(
      ".profile span"
    ).textContent = `Welcome, ${userData.email}`;

    page.redirect("/index.html", "/all-memes");
  }
}
