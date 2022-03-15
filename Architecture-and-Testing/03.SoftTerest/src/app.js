import { showHomePage } from './views/home.js';
import { showCatalogPage } from './views/catalog.js';
import { showCreatePage } from './views/create.js';
import { showRegisterPage } from './views/register.js';
import { showLoginPage } from './views/login.js';
import { showDetailsPage } from './views/details.js';
import { logout } from './api/data.js';

const links = {
    'homeLink': 'home',
    'getStartedlink': 'home',
    'catalogLink': 'catalog',
    'loginLink': 'login',
    'registerLink': 'register',
    'createLink': 'create'
};

const views = {
    'home': showHomePage,
    'create': showCreatePage,
    'catalog': showCatalogPage,
    'login': showLoginPage,
    'register': showRegisterPage,
    'details': showDetailsPage
};

const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

document.getElementById('logoutBtn').addEventListener('click', async (event) => {
    event.preventDefault();

    await logout();
    goTo('home');
    updateNav();
});

const contex = {
    goTo,
    showSection,
    updateNav
};

//start app
goTo('home');
updateNav();

function onNavigate(event) {
    const name = links[event.target.id];

    if(name) {
        event.preventDefault();
        goTo(name);
    }
} 

function goTo(name, ...params) {
    const view = views[name];

    if (typeof view == 'function') {
        view(contex, ...params);
    }
}

function showSection(section) {
    main.replaceChildren(section);
}

function updateNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData != null) {
        [...document.querySelectorAll('.user')].forEach(link => link.style.display = 'inline-block');
        [...document.querySelectorAll('.guest')].forEach(link => link.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(link => link.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(link => link.style.display = 'inline-block');
    }
}