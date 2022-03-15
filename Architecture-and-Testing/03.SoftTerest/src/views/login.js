import { login } from "../api/data.js";

const section = document.getElementById('login-page');
section.remove();

let contex = null;

export function showLoginPage(contexTarget) {
    contex = contexTarget;
    contex.showSection(section);

    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email').trim();
    const pass = formData.get('password').trim();

    if (!email || !pass) {
        return alert('All fields must be filled!');
    }

    await login(email, pass);

    contex.goTo('home');
    contex.updateNav();
}
