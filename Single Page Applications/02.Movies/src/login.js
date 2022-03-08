import { showView } from './dom.js';
import { showHomePage } from './home.js';
import { navigation } from './app.js';

const loginSection = document.getElementById('form-login');
const loginForm = loginSection.querySelector('form');

loginSection.remove();

loginForm.addEventListener('submit', onLogin);

export function showLoginPage() {
    showView(loginSection);

}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const loginInfo = {
        email: formData.get('email').trim(),
        password: formData.get('password').trim(),
    }

    const url = 'http://localhost:3030/users/login';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
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

        loginForm.reset();

        showHomePage();

    } catch (error) {
        alert(error);
    }




}