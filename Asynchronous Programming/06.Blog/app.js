function attachEvents() {
    const loadPostBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');

    loadPostBtn.addEventListener('click', loadPost);
    viewPostBtn.addEventListener('click', viewPost);
}

async function loadPost() {
    const menu = document.getElementById('posts');
    try {
        const res = await fetch('http://localhost:3030/jsonstore/blog/posts');
        if (res.status != 200) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const dataKeys = Object.keys(data);

        menu.replaceChildren();
        
        for (const id of dataKeys) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = data[id].title;
            menu.appendChild(option);
        }
        
    } catch (error) {
        menu.textContent = error.message;
    }
}

async function viewPost() {
    const id = document.getElementById('posts').value;
    const commentsBody = document.getElementById('post-comments');
    const post = await getPostbyId(id);

    commentsBody.replaceChildren();

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-body').textContent = post.body;

    const comments = await getCommentsById(id);

    comments.forEach(comment => {
        const liElement = document.createElement('li');
        liElement.id = comment.id;
        liElement.textContent = comment.text;

        commentsBody.appendChild(liElement);
    });
}

async function getPostbyId(id) {
    const res = await fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`);
    const data = await res.json();

    return data;
}

async function getCommentsById(id) {
    const res = await fetch('http://localhost:3030/jsonstore/blog/comments');
    const data = await res.json();

    const filteredComments = Object.values(data).filter(comment => comment.postId === id);
    return filteredComments;
}

attachEvents();