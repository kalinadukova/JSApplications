import { getAllBooks } from "../api/data.js";
import { html, until } from "../lib.js";
import { loaderTemplate } from "./common/loader.js";

const homeTemplate = (books) => html`<section
  id="dashboard-page"
  class="dashboard"
>
  <h1>Dashboard</h1>
  ${books.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : html`<ul class="other-books-list">
        ${books.map(bookTemplate)}
      </ul>`}
</section>`;

const bookTemplate = (book) => html`<li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src=${book.imageUrl} /></p>
  <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export function homePage(ctx) {
  ctx.render(until(populateTemplate(), loaderTemplate()));
}

async function populateTemplate() {
  const books = await getAllBooks();
  return homeTemplate(books);
}
