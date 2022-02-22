window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);

    document.getElementById('logout').style.display = 'none';
    document.querySelector('#guest #login').style.display = 'none';
});

async function onLogin(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: formData.get('email'),
                password: formData.get('password')
            }
        )
    };

    const url = 'http://localhost:3030/users/login';

    try {
        const res = await fetch(url, options);

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        console.log(userData);

        sessionStorage.setItem('userData', JSON.stringify(userData));
        console.log(sessionStorage);
        window.location = '/index.html';

    } catch (error) {
        alert(error.message);
    }
}