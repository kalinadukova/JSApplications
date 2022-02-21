const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
const textArea = document.getElementById('messages');

attachEvents();

function attachEvents() {
    refreshBtn.addEventListener('click', loadMessages);
    submitBtn.addEventListener('click', submitMessage);

}

async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);

    const data = await res.json();

    let messages = Object.values(data);

    textArea.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');


}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}

async function submitMessage() {
    const nameInput = document.querySelector('[name="author"]').value;
    const contentInput = document.querySelector('[name="content"]').value;

    await createMessage({ author: nameInput, content: contentInput });
}