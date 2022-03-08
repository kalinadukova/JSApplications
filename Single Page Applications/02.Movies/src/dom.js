const mainElement = document.querySelector('main');

export function showView(section) {
    mainElement.replaceChildren(section);
}