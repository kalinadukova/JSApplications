import { changeTopic } from './comments.js';

const homeSection = document.getElementById('home-page');
const commentSection = document.getElementById('comments-page');
const homeBtn = document.querySelector('nav ul li a');
homeBtn.addEventListener('click', onHomePage);

export async function createTopic(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    event.target.reset();

    if (Array.from(formData.values()).includes('') == true) {
        alert('Fill all the input fields!');
    } else {
        const d = new Date();
        const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
        const dataObj = {
            topicName: formData.get('topicName'),
            username: formData.get('username'),
            postText: formData.get('postText'),
            date: d.toLocaleString()
        };

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        };

        const res = await fetch(url, options);

        try {
            if (res.ok == false) {
                const err = await res.json();
                throw new Error(err.message);
            }

            const data = await res.json();
            addTopicToDiv(data);

        } catch (error) {
            alert(error);
        }
    }
}

function addTopicToDiv(data) {
    const topicContainer = document.createElement('div');

    topicContainer.className = 'topic-container';
    topicContainer.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="comments.html" class="normal">
                <h2 id="${data._id}">${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    homeSection.append(topicContainer);
    attachEvent();
}

export async function loadTopics() {
    const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    const res = await fetch(url);
    const data = await res.json();

    Object.values(data).forEach(element => {
        addTopicToDiv(element);
    });

    attachEvent();
}

export async function onNavigate(event) {
    event.preventDefault();

    showCommentPage();

    const id = event.target.id;
    const topic = await getTopicById(id);

    if (event.target.tagName === 'H2') {
        changeTopic(topic);
    }
}

async function getTopicById(id) {
    const url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

function attachEvent() {
    const topics = [...document.querySelectorAll('.normal')];
    topics.forEach(element => element.addEventListener('click', onNavigate));
}

export function showHomePage() {
    document.querySelector('main').append(homeSection);
    commentSection.remove();
}

function showCommentPage() {
    document.querySelector('main').append(commentSection);
    homeSection.remove();
}

function onHomePage(event) {
    event.preventDefault();

    if (event.target.tagName === 'A') {
        showHomePage();
    }
}



