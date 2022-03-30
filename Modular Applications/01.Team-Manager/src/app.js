import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { browsePage } from "./views/browse.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./api/data.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myTeamsPage } from "./views/myTeams.js";

const root = document.querySelector("main");

page.redirect("/index.html", "/");

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
  setUserNav();
  page.redirect("/");
});

page("/", decorateContex, homePage);
page("/browse", decorateContex, browsePage);
page("/login", decorateContex, loginPage);
page("/register", decorateContex, registerPage);
page("/create", decorateContex, createPage);
page("/details/:id", decorateContex, detailsPage);
page("/edit/:id", decorateContex, editPage);
page("/my-teams", decorateContex, myTeamsPage);
page.start();

setUserNav();

function decorateContex(ctx, next) {
  ctx.setUserNav = setUserNav;
  ctx.render = (content) => render(content, root);
  next();
}

function setUserNav() {
  const userData = getUserData();

  if (userData != null) {
    [...document.getElementsByClassName("guest")].map(
      (el) => (el.style.display = "none")
    );
    [...document.getElementsByClassName("user")].map(
      (el) => (el.style.display = "inline-block")
    );
  } else {
    [...document.getElementsByClassName("guest")].map(
      (el) => (el.style.display = "inline-block")
    );
    [...document.getElementsByClassName("user")].map(
      (el) => (el.style.display = "none")
    );
  }
}
