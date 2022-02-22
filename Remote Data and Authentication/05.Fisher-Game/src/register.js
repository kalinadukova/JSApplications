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
        const data = await res.json();

        if (res.status != 200) {
            const error = await res.json();
            throw new Error(error.message);
        }
        
        sessionStorage.setItem('authToken', data.accessToken);
        window.location = '/index.html';
    }
    catch (error) {
        alert(error.message);
    }

    
}