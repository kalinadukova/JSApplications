import { loadMeme, deleteMeme } from "../api/data.js";
import { html, page, until } from "../lib.js";
import { getUserData } from "../util.js";
import { loaderTemplate } from "./commonTemplates/loader.js";

const detailsTemplate = (meme, isOwner, onDelete) => html`<section
  id="meme-details"
>
  <h1>Meme Title: ${meme.title}</h1>
  <div class="meme-details">
    <div class="meme-img">
      <img alt="meme-alt" src=${meme.imageUrl} />
    </div>
    <div class="meme-description">
      <h2>Meme Description</h2>
      <p>${meme.description}</p>

      <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
      ${isOwner
        ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
        : ""}
    </div>
  </div>
</section>`;

export function detailsPage(ctx) {
  ctx.render(until(populateTemplate(), loaderTemplate()));

  async function populateTemplate() {
    const id = ctx.params.id;
    const meme = await loadMeme(id);
    const userData = getUserData();

    let isOwner;

    if (!userData) {
      isOwner = false;
    } else {
      if (meme._ownerId == userData.id) {
        isOwner = true;
      } else {
        isOwner = false;
      }
    }

    return detailsTemplate(meme, isOwner, onDelete);
  }

  async function onDelete() {
    const id = ctx.params.id;
    await deleteMeme(id);

    page.redirect("/all-memes");
  }
}
