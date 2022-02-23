window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister);

    document.getElementById('logout').style.display = 'none';
    document.querySelector('#guest #register').style.display = 'none';
});

async function onRegister(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);

    if (formData.get('password') != formData.get('rePass')) {
        return console.error('Passwords don\'t match');
    }

    const url = 'http://localhost:3030/users/register';
    const options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: formData.get('email'),
                password: formData.get('password'),
            }
        )
    };

    try {
        const res = await fetch(url, options);

        if (res.status != 200) {
            const error = await res.json();
            throw new Error(error.message);
        }
        
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        const data = await res.json();

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = '/index.html';

    }
    catch (error) {
        alert(error.message);
    }

    
}