window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login').addEventListener('submit', onLogin);
    document.getElementById('register').addEventListener('submit', onRegister);
    
});

async function onLogin(ev) {
    ev.preventDefault();
    
    const formData = new FormData(ev.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData) 
    };

    const url = 'http://localhost:3030/users/login';
    const res = await fetch(url, options);

    try {
        if (res.status != 200) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        console.log(data);

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));
        console.log(sessionStorage);
        window.location = '/homeLogged.html'

    } catch (error) {   
        alert(error.message);
    }
}

async function onRegister(ev) {
    ev.preventDefault();
    
    const formData = new FormData(ev.target);

    if (formData.get('password') != formData.get('rePass')) {
        return console.error('Passwords don\'t match');
    }

    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData) 
    };

    const url = 'http://localhost:3030/users/register';
    const res = await fetch(url, options);

    try {
        if (res.status != 200) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = '/homeLogged.html'

    } catch (error) {
        alert(error.message);
    }
}