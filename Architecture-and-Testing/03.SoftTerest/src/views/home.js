const section = document.getElementById('home-page');
let contex = null;

section.remove();

section.querySelector('#getStartedLink').addEventListener('click', (event) => {
    event.preventDefault();
    contex.goTo('catalog');
});

export function showHomePage(contexTarget) {
    contex = contexTarget;
    contex.showSection(section);
}