window.onload = solution();
const sectionEl = document.getElementById('main');

async function solution() {

    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    try {
        if (res.status != 200) {
            throw new Error('${Error.status} ${Error.statusText}');
        }

        const data = await res.json();

        for (const dataEl of data) {
            sectionEl.innerHTML += `
            <div class="accordion">
            <div class="head">
                <span>${dataEl.title}</span>
                <button class="button" id="${dataEl._id}">More</button>
                <div class="extra">
                <p></p>
            </div>
            </div>
            </div> 
            `;
        }

    } catch (error) {
        sectionEl.textContent = error.message;
    }

    const moreBtns = [...document.getElementsByTagName('button')];
    moreBtns.forEach(btn => btn.addEventListener('click', showMoreContent));
}

function showMoreContent(event) {
    const button = event.target;
    const accordion = button.parentNode;
    const extraInfo = accordion.getElementsByClassName('extra')[0];
    const accordionId = accordion.getElementsByClassName('button')[0].id;
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${accordionId}`;

    fetch(url)
        .then(res => {
            if (res.status != 200) {
                throw new Error('${Error.status} ${Error.statusText}');
            }
            return res.json();
        })
        .then(data => { extraInfo.textContent = data.content;

        if (button.textContent == 'More') {
            extraInfo.style.display = 'inline-block';
            button.textContent = 'Less';
            console.log(button);
            
        } else {
            extraInfo.textContent = '';
            button.textContent = 'More';
        }
        })
        .catch(error => console.log(error.message));

}