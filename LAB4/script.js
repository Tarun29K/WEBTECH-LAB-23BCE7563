
const username = document.getElementById('username');
const feedback = document.getElementById('feedback');
const submit = document.getElementById('submit');
const form = document.getElementById('regForm');

let isUsernameAvailable = false;

username.addEventListener('input', async (e) => {
    const user = e.target.value.trim().toLowerCase();

    if (user.length < 3) {
        feedback.textContent = "Too short...";
        feedback.className = "status error";
        isUsernameAvailable = false;
        return;
    }

    //loading-indicator
    feedback.textContent = "Checking...";
    feedback.className = "status loading";

    
});

form.addEventListener('submit', (e) => {
    if (!isUsernameAvailable) {
        e.preventDefault();
        alert("Please choose an available username before submitting.");
    } else {
        alert("Form submitted successfully!");
    }
});