const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const skillsGroup = document.getElementById('skillsGroup');

//validation message
function updateMessage(errorId, message, isValid) {
    const errorSpan = document.getElementById(errorId);
    errorSpan.textContent = message;
    errorSpan.style.color = isValid ? "green" : "red";
    errorSpan.style.marginLeft = "10px";
}

//role specific changes
roleSelect.addEventListener('change', function() {
    if (roleSelect.value === 'admin') {
        skillsGroup.style.display = 'none';
        updateMessage('skillsError', '', true);
    } else {
        skillsGroup.style.display = 'block';
    }
});

//name validation
document.getElementById('name').addEventListener('input', function() {
    const isValid = this.value.trim() !== "";
    updateMessage('nameError', isValid ? "✓" : "Name is required", isValid);
});

//email validation
document.getElementById('email').addEventListener('input', function() {
    const val = this.value.trim();
    const isValid = val !== "" && val.includes('@') && val.endsWith('.com');
    updateMessage('emailError', isValid ? "✓" : "Must be a valid email address", isValid);
});

//password check
document.getElementById('password').addEventListener('input', function() {
    const val = this.value;
    const role = roleSelect.value;
    let isValid = false;
    let msg = "";

    if(val === "") {
        msg = "Password is required";
    } else if (role === 'admin') {
        const hasSymbol = /[!@#$%^&*]/.test(val);
        isValid = val.length >= 10 && hasSymbol;
        msg = isValid ? "✓ Strong Admin Password" : "Admin needs 10+ chars & symbol";
    } else {
        isValid = val.length >= 6;
        msg = isValid ? "✓" : "Min 6 characters";
    }
    updateMessage('passwordError', msg, isValid);
});

document.getElementById('confirmPassword').addEventListener('input', function() {
    const pass = document.getElementById('password').value;
    const isValid = this.value === pass && this.value !== "";
    updateMessage('confirmError', isValid ? "✓ Passwords match" : "Does not match", isValid);
});

//check valid form
form.addEventListener('submit', function(e) {
    const errorSpans = document.querySelectorAll('span');
    let hasErrors = false;

    //empty field check
    const name = document.getElementById('name').value;
    if (name === "") {
        updateMessage('nameError', "Name is required", false);
        hasErrors = true;
    }
    const email = document.getElementById('email').value;
    if (email === "") {
        updateMessage('emailError', "Email address is required", false);
        hasErrors = true;
    }
    const password = document.getElementById('password').value;
    if (password === "") {
        updateMessage('passwordError', "Password is required", false);
        hasErrors = true;
    }

    //leftover errors
    errorSpans.forEach(span => {
        if (span.style.color === "red") {
            hasErrors = true;
        }
    });

    if (hasErrors) {
        e.preventDefault();
        alert("Please verify the details before submitting.");
    } else {
        alert("Form submitted successfully!");
    }
});