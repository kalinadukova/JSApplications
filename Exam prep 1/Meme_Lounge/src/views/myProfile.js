import { userMemes } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../util.js";
import { loaderTemplate } from "./commonTemplates/loader.js";

const profileTemplate = (memes, userData) => html`
  <section id="user-profile-page" class="user-profile">
<article class="user-info">
  <img
    id="user-avatar-url"
    alt="user-profile"
    src=${userData.gender == "male" ? "/images/male.png" : "/images/female.png"}
  />
  <div class="user-content">
    <p>Username: ${userData.username}</p>
    <p>Email: ${userData.email}</p>
    <p>My memes count: ${memes.length}</p>
  </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
  ${
    memes.length != 0
      ? memes.map(memeTemplate)
      : html`<p class="no-memes">No memes in database.</p>`
  }
</div>
</section>
</div>`;

const memeTemplate = (meme) => html`<div class="user-meme">
  <p class="user-meme-title">${meme.title}</p>
  <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
  <a class="button" href="/details/${meme._id}">Details</a>
</div>`;

export function profilePage(ctx) {
  ctx.render(until(populateTemplate(), loaderTemplate()));

  async function populateTemplate() {
    const userData = getUserData();
    const userId = userData.id;
    const memes = await userMemes(userId);

    return profileTemplate(memes, userData);
  }
}
