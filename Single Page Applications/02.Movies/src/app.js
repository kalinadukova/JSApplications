import { showHomePage } from './home.js';
import { showLoginPage } from './login.js';
import { showRegisterPage } from './register.js';

const navElement = document.querySelector('nav');

showHomePage();
navigation();

const views = {
    'homeLink': showHomePage,
    'loginLink': showLoginPage,
    'registerLink': showRegisterPage,
};

navElement.querySelector('#logoutBtn').addEventListener('click', onLogout);
navElement.addEventListener('click', event => {
    const view = views[event.target.id];
    if (typeof view === 'function') {
        event.preventDefault();
        view();
    }
});

export function navigation() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        navElement.querySelector('#welcome-msg').textContent = `Welcome, ${userData.email}`;
        [...navElement.getElementsByClassName('guest')].forEach(e => e.style.display = 'none');
        [...navElement.getElementsByClassName('user')].forEach(e => e.style.display = 'block');
    } else {
        [...navElement.getElementsByClassName('guest')].forEach(e => e.style.display = 'block');
        [...navElement.getElementsByClassName('user')].forEach(e => e.style.display = 'none');
    }
}

async function onLogout(event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    

    const options = {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    };

    await fetch('http://localhost:3030/users/logout', options);

    sessionStorage.clear();
    navigation();
    showLoginPage();
}

