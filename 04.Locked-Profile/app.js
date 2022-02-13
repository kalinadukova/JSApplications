const mainBodyDiv = document.querySelector('#container #main');

async function lockedProfile() {
    let res = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let data = await res.json();
    console.log(data);

    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
        mainBodyDiv.innerHTML += `
        <div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user1Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user1Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${data[dataKeys[i]].username}" disabled readonly />
        <div class="hiddenInfo">
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value="${data[dataKeys[i]].email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user1Age" value="${data[dataKeys[i]].age}" disabled readonly />
        </div>
        <button id="showHidden">Show more</button>
        </div>
        `;
    }

    const showMoreBtns = [...document.getElementsByTagName('button')];
    showMoreBtns.forEach(btn => btn.addEventListener('click', showContent));
}

function showContent(event) {
    const button = event.target;
    const profile = button.parentNode;
    const hiddenInfoLabel = profile.querySelectorAll('.hiddenInfo > label');
    const hiddenInfoInput = profile.querySelectorAll('.hiddenInfo > input');
    const status = profile.querySelector('input[type="radio"]:checked').value;

    console.log(profile);
    console.log(hiddenInfoLabel);
    console.log(hiddenInfoInput);

    if(status === 'unlock') {
        if(button.textContent === 'Show more') {
            hiddenInfoLabel.forEach(el => el.style.display = 'inline-block');
            hiddenInfoInput.forEach(el => el.style.display = 'inline-block');
            button.textContent = 'Hide it';
        } else {
            hiddenInfoLabel.forEach(el => el.style.display = 'none');
            hiddenInfoInput.forEach(el => el.style.display = 'none');
            button.textContent = 'Show more';
        }
    }
    
}

