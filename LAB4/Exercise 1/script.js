
const username = document.getElementById('username');
const feedback = document.getElementById('feedback');
const submit = document.getElementById('submit');
const form = document.getElementById('regForm');

let isUsernameAvailable = false;

username.addEventListener('input', function() {
    const user = this.value.trim().toLowerCase();

    if (user.length < 3) {
        feedback.textContent = "Too short...";
        feedback.className = "status error";
        isUsernameAvailable = false;
        return;
    }

    //loading-indicator
    feedback.textContent = "Checking...";
    feedback.className = "status loading";

    //XMLHTTP Request for AJAX
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', './users.json', true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            const data = JSON.parse(xhttp.responseText);
            const takenUsers = data.registeredUsers;

            if(takenUsers.includes(user)){
                feedback.textContent = "Username already exists.";
                feedback.className = "status error";
                isUsernameAvailable = false;
            } else {
                feedback.textContent = "Username available";
                feedback.className = "status success";
                isUsernameAvailable = true;
            }
        } else {
            feedback.textContent = "Error loading data...";
            feedback.className = "status error";
        }
    };

    xhttp.send();
    
});

form.addEventListener('submit', (e) => {
    if (!isUsernameAvailable) {
        e.preventDefault();
        alert("Please choose a valid username.");
    } else {
        alert("Form submitted successfully!");
    }
});