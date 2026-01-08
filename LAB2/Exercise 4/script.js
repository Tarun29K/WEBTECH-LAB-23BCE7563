const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearBtn = document.getElementById('clearAll');

document.addEventListener('DOMContentLoaded', displayUsers);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const mobile = document.getElementById('userMobile').value;
    const pass = document.getElementById('userPass').value;

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    if (pass.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    //LocalStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    //duplicate email
    if (users.some(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    const newUser = { name, email, mobile, pass };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><button class="delete-btn" onclick="deleteUser(${index})">Delete</button></td>
        `;
        userList.appendChild(row);
    });
}

window.deleteUser = function(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
};

clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete All users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
});