const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const res = await fetch(host + url, options);

        if (res.ok == false) {
            if (res.status == 403) {
                sessionStorage.clear();
            }
            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

function createOptions(method, data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const options = {
        method,
        headers: {}, 
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

async function get(url) {
    return request(url, createOptions('get'));
}

async function post(url, data) {
    return request(url, createOptions('post', data));
}

async function put(url, data) {
    return request(url, createOptions('put', data));
}

async function del(url) {
    return request(url, createOptions('delete'));
}

async function login(email, password) {
    const result = await post('/users/login', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

async function register(email, password) {
    const result = await post('/users/register', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    };

    sessionStorage.setItem('userData', JSON.stringify(userData));
}

async function logout() {
    await get('/users/logout');

    sessionStorage.clear();
}

export{
    get,
    post,
    put,
    del,
    login,
    register,
    logout,
}