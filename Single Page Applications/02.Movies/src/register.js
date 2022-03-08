import { showView } from './dom.js';
import { navigation } from './app.js';

const registerSection = document.getElementById('form-sign-up');
const registerForm = registerSection.querySelector('form');

registerSection.remove();

registerForm.addEventListener('submit', onRegister);


export function showRegisterPage() {
    showView(registerSection);

}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (formData.get('password') != formData.get('repeatPassword')) {
        return console.error('Passwords don\'t match');
    }

    const registerInfo = {
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
    }

    const url = 'http://localhost:3030/users/register';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
    };

    try {
        const res = await fetch(url, options);

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        navigation();

        registerForm.reset();

        showHomePage();

    } catch (error) {
        alert(error);
    }
}