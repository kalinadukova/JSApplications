function loadCommits() {
    let username = document.getElementById('username').value;
    let repoName = document.getElementById('repo').value;
    let url = `https://api.github.com/repos/${username}/${repoName}/commits`;
    let ulList = document.getElementById('commits');

    fetch(url)
        .then(res => {
            if (res.ok == false){
                throw new Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(addCommits)
        .catch(handleError);

    function addCommits(data){
        ulList.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            let liElement = document.createElement('li');
            liElement.innerHTML = `${data[i].commit.author.name}: ${data[i].commit.message}`;
            ulList.appendChild(liElement);
        }
    }

    function handleError(error) {
        ulList.innerHTML = '';
        ulList.textContent = error.message;
    }
}