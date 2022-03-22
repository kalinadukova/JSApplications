import { html, render } from "../node_modules/lit-html/lit-html.js";

const div = document.querySelector("div");

document.querySelector("form").addEventListener("submit", addItem);

getData();

const selectTemplate = (data) => html`
  <select id="menu">
    ${data.map((d) => html` <option value=${d._id}>${d.text}</option> `)}
  </select>
`;

async function getData() {
  const res = await fetch("http://localhost:3030/jsonstore/advanced/dropdown ");
  const data = await res.json();

  update(Object.values(data));
}

function update(data) {
  const result = selectTemplate(data);
  render(result, div);
}

async function addItem(event) {
  event.preventDefault();

  const value = document.getElementById("itemText").value;

  event.target.reset();

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: value,
    }),
  };

  await fetch("http://localhost:3030/jsonstore/advanced/dropdown", options);

  getData();
}
