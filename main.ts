const F1 = document.forms.namedItem('f1') as HTMLFormElement;
let tbody = document.querySelector('tbody');

interface obj {
    login: string,
    password: string,
    email: string,
    id: number
}

let arr: Array<obj> = [];

F1.addBtn.addEventListener('click', () => {
    let obj: obj = {
        login: "",
        password: "",
        email: "",
        id: 0,
    }

    obj.login = F1.login.value;
    obj.password = F1.password.value;
    obj.email = F1.email.value;
    arr.push(obj);
    render();
    F1.login.value = '';
    F1.password.value = '';
    F1.email.value = '';
    tbody.addEventListener('click', deleteUser);
    tbody.addEventListener('click', editUser);
    F1.saveBtn.addEventListener('click', saveEditUser);
    console.log(arr);
    
})

function render(): void {
    tbody.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = i;
        tbody.innerHTML += `
        <tr>
        <th scope="row">${i + 1}</th>
        <td>${arr[i].login}</td>
        <td>${arr[i].password}</td>
        <td>${arr[i].email}</td>
        <td><button type="button" class="btn btn-warning" name="${i}">Edit</button></td>
        <td><button type="button" class="btn btn-danger" name="${i}">Delete</button></td>     
      </tr>`
    }
}

function deleteUser(event): void {
    const item = event.target;
    if (item.classList[1] === 'btn-danger') {
        arr.splice(arr.findIndex(user => user.id == item.name), 1);
        item.parentElement.remove();
        render();
    }
}

let index;

function editUser(event): void {
    const item = event.target;
    if (item.classList[1] === 'btn-warning') {
        F1.addBtn.style.display = 'none';
        F1.saveBtn.style.display = 'block';
        F1.login.value = arr[item.name].login;
        F1.password.value = arr[item.name].password;
        F1.email.value = arr[item.name].email;
        F1.addBtn.style.display = 'none';
        F1.saveBtn.style.display = 'block';
        index = item.name;
    }
}

function saveEditUser(): void {
        arr[index].login = F1.login.value;
        arr[index].password = F1.password.value;
        arr[index].email = F1.email.value;
        F1.login.value = '';
        F1.password.value = '';
        F1.email.value = '';
        render();
        F1.saveBtn.style.display = "none";
        F1.addBtn.style.display = "block";
}