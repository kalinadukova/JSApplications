import {
  getBookById,
  deleteBook,
  addALike,
  getBookLikes,
  isBookLiked,
} from "../api/data.js";
import { html, page } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  book,
  isOwner,
  onDelete,
  likes,
  showLikeButton,
  onLike
) => html`<section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      <!-- Edit/Delete buttons ( Only for creator of this book )  -->
      ${isOwner
        ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)"
              >Delete</a
            >`
        : ""}
      ${likeControlsTemplate(showLikeButton, onLike)}

      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->

      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

const likeControlsTemplate = (showLikeButton, onLike) => {
  if (showLikeButton) {
    return html`<a @click=${onLike} class="button" href="javascript:void(0)"
      >Like</a
    >`;
  } else {
    return null;
  }
};

export async function detailsPage(ctx) {
  ctx.render(await populateTemplate());

  async function populateTemplate() {
    const id = ctx.params.id;
    const userData = getUserData();
    // const book = await getBookById(id);

    const [book, likes, hasLike] = await Promise.all([
      getBookById(id),
      getBookLikes(id),
      userData ? isBookLiked(id, userData.id) : 0,
    ]);

    let isOwner;

    if (!userData) {
      isOwner = false;
    } else {
      if (userData.id == book._ownerId) {
        isOwner = true;
      } else {
        isOwner = false;
      }
    }

    const showLikeButton =
      userData != null && isOwner == false && hasLike == false;

    return detailsTemplate(
      book,
      isOwner,
      onDelete,
      likes,
      showLikeButton,
      onLike
    );
  }

  async function onDelete() {
    const id = ctx.params.id;
    await deleteBook(id);
    page.redirect("/");
  }

  async function onLike() {
    await addALike(ctx.params.id);
    page.redirect(`/details/${ctx.params.id}`);
  }
}
