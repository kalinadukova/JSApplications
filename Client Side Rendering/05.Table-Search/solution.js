import { html, render } from "../node_modules/lit-html/lit-html.js";

let students;
const tableBody = document.querySelector("tbody");

document.getElementById("searchBtn").addEventListener("click", searchTable);

start();

const tableTemplate = (student) => html`<tr
  class=${student.match ? "select" : ""}
>
  <td>${student.item.firstName} ${student.item.lastName}</td>
  <td>${student.item.email}</td>
  <td>${student.item.course}</td>
</tr>`;

async function start() {
  const res = await fetch("http://localhost:3030/jsonstore/advanced/table");
  const data = await res.json();
  students = Object.values(data).map((s) => ({ item: s, match: false }));

  update();
}

function update() {
  render(students.map(tableTemplate), tableBody);
}

function searchTable() {
  const fieldValue = document
    .getElementById("searchField")
    .value.trim()
    .toLowerCase();

  for (let st of students) {
    st.match = Object.values(st.item).some(
      (v) => fieldValue && v.toLowerCase().includes(fieldValue)
    );
  }

  document.getElementById("searchField").value = "";

  update();
}
