let button = document.getElementById('button');
button.addEventListener('click', loadRepos);

window.onload = function() {
	document.getElementById('username').focus();
}

function loadRepos() {
	let username = document.getElementById('username').value;
	let url = `https://api.github.com/users/${username}/repos`;
	let ul = document.getElementById('repos');

	fetch(url)
		.then(res => {
			if(res.ok == false) {
				throw new Error(`${res.status} ${res.statusText}`);
			}
			return res.json()
		})
		.then(retrieveRepos)
		.catch(handleError);
	
	function retrieveRepos(data) {
		ul.innerHTML = '';
		for (let i = 0; i < data.length; i++){
			let li = document.createElement('li');
			li.innerHTML = `<a href="${data[i].html_url}">${data[i].full_name}</a>`
			ul.appendChild(li);
		}
	}

	function handleError(error) {
		ul.innerHTML = '';
		ul.textContent = error.message;
	}
}