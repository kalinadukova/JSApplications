export function changeTopic(topic) {
    const div = document.querySelector('.container');
    const title = document.querySelector('.theme-name > h2');
    const commentDiv = document.getElementsByClassName('comment')[0];

    title.textContent = topic.topicName;

    commentDiv.innerHTML = `
    <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${topic.username}</span> posted on <time>${topic.date}</time></p>

        <p class="post-content">${topic.postText}</p>
    </div>
    `;

    loadComments();
}

export async function addComment(event) {
    event.preventDefault();

    const title = document.querySelector('.theme-name > h2').textContent;
    const formData = new FormData(event.target);
    const d = new Date();

    event.target.reset();

    const commentInfo = {
        topic: title,
        commentText: formData.get('postText'),
        username: formData.get('username'),
        date: d.toLocaleString(),
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentInfo)
    }

    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const res = await fetch(url, options);
    const data = await res.json();

    addCommentToDiv(data);
}

function addCommentToDiv(element) {
    const commentDiv = document.getElementsByClassName('comment')[0];
    commentDiv.innerHTML += `
    <div id="user-comment">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${element.username}</strong> commented on <time>${element.date}</time></p>
                <div class="post-content">
                    <p>${element.commentText}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

async function loadComments() {
    const title = document.querySelector('.theme-name > h2').textContent;
    const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';
    const res = await fetch(url);
    const data = await res.json();

    Object.values(data).forEach(element => {
        if (element.topic === title) {
            addCommentToDiv(element);
        }
    });
}

