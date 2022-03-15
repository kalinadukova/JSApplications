import { register } from "../api/data.js";

const section = document.getElementById('register-page');
section.remove();

let contex = null;

export function showRegisterPage(contexTarget) {
    contex = contexTarget;
    contex.showSection(section);

    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email').trim();
    const pass = formData.get('password').trim();
    const rePass = formData.get('repeatPassword').trim();

    if (!email || !pass || !rePass) {
        return alert('All fields must be filled!');
    }

    if (pass != rePass) {
        return alert('Passwords don\'t match!');
    }

    await register(email, pass);

    contex.goTo('home');
    contex.updateNav();
}