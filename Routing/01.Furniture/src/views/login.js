import { html } from "../lib.js";
import { login } from "../api/data.js";

const loginTemplate = (onSubmit) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input
            class="form-control"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
`;

export function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userInfo = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await login(userInfo);

    ctx.updateNav();
    ctx.page.redirect("/");
  }
}
