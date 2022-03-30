import { logout } from "./api/data.js";
import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { myBooksPage } from "./views/myBooks.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector("main");

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
  updateUserNav();
  page.redirect("/");
});

updateUserNav();

page.redirect("/index.html", "/");

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/create", decorateContext, createPage);
page("/my-books", decorateContext, myBooksPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page.start();

function decorateContext(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.updateUserNav = updateUserNav;
  next();
}

function updateUserNav() {
  const userData = getUserData();

  if (userData) {
    document.getElementById("guest").style.display = "none";
    document.getElementById("user").style.display = "block";

    document.querySelector(
      "#user span"
    ).textContent = `Welcome, ${userData.email}`;
  } else {
    document.getElementById("guest").style.display = "block";
    document.getElementById("user").style.display = "none";
  }
}
