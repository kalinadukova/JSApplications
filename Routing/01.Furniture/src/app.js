import { page, render } from "./lib.js";
import { homePage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { detailsPage } from "./views/details.js";
import { updatePage } from "./views/update.js";
import { getUserData } from "./util.js";
import { logout } from "./api/data.js";

const root = document.querySelector(".container");

// page(decorateContex);
page("/", decorateContex, homePage);
page("/create", decorateContex, createPage);
page("/login", decorateContex, loginPage);
page("/register", decorateContex, registerPage);
page("/my-publications", decorateContex, homePage);
page("/details/:id", decorateContex, detailsPage);
page("/edit/:id", decorateContex, updatePage);

updateNav();
page.start();

page.redirect("/index.html", "/");

async function decorateContex(ctx, next) {
  ctx.render = (template) => render(template, root);
  ctx.updateNav = updateNav;
  next();
}

export function updateNav() {
  const userData = getUserData();
  if (userData != null) {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
  updateNav();
  page.redirect("/");
});
