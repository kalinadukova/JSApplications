import { login } from "../api/data.js";
import { html } from "../lib.js";

const loginTemplate = (onSubmit, errorMsg) => html`<section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form @submit=${onSubmit} id="login-form" class="main-form pad-large">
      ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ""}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email").trim(),
      password: formData.get("password").trim(),
    };

    try {
      await login(data);

      ctx.setUserNav();
      ctx.page.redirect("/my-teams");
    } catch (error) {
      ctx.render(loginTemplate(onSubmit, error.message));
    }
  }
}
