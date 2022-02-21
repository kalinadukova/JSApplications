const form = document.getElementById('form');
const tableBodyEl = document.querySelector('#results tbody');

//window.onload = loadStudents;

form.addEventListener('submit', loadStudents);

async function loadStudents(ev) {
    ev.preventDefault();
    const data = new FormData(form);
    
    addStudent(data);

    form.reset();

    const url = 'http://localhost:3030/jsonstore/collections/students';
    const res = await fetch(url);
    const dataRes = await res.json();

    const studentsInfo = Object.values(dataRes);

    tableBodyEl.innerHTML = '';

    for (const element of studentsInfo) {
        addStudentToTable(element);
    }
}

async function addStudent(formData) {
    console.log([...formData.values()]);
    if ([...formData.values()].includes('') == false){
        const student = {
            firstName:	formData.get('firstName'),
            lastName:	formData.get('lastName'),
            facultyNumber:	formData.get('facultyNumber'),
            grade:	formData.get('grade')
        };
    
        console.log(student);
    
        const url = 'http://localhost:3030/jsonstore/collections/students';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        };
        const res = await fetch(url, options);
        const data = res.json();
    
        addStudentToTable(student);
    }
    
}

function addStudentToTable(element) {
    tableBodyEl.innerHTML += `
        <tr>
            <th>${element.firstName}</th>
            <th>${element.lastName}</th>
            <th>${element.facultyNumber}</th>
            <th>${element.grade}</th>
        </tr>
        `;
}