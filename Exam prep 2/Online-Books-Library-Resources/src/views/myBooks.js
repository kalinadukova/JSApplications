import { getUserBooks } from "../api/data.js";
import { html, until } from "../lib.js";
import { getUserData } from "../util.js";
// import { loaderTemplate } from "./common/loader.js";

const myBooksTemplate = (books) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<!-- Display ul: with list-items for every user's books (if any) -->
<ul class="my-books-list">
${
  books.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : books.map(bookTemplate)
}
</ul>
</section>
</div>`;

const bookTemplate = (book) => html`<li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src=${book.imageUrl} /></p>
  <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function myBooksPage(ctx) {
  ctx.render(await populateTemplate());

  async function populateTemplate() {
    const userId = getUserData().id;
    const books = await getUserBooks(userId);

    return myBooksTemplate(books);
  }
}
