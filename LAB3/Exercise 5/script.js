// Requirement 6: Temporary Storage
let currentStage = 1;
let formData = {};

const stages = document.querySelectorAll('.stage');
const progressBar = document.getElementById('progressBar');

// Requirement 4: DOM Manipulation to show/hide stages
function updateUI() {
    stages.forEach((s, index) => {
        s.style.display = (index + 1 === currentStage) ? 'block' : 'none';
    });
    
    // Requirement 3: Dynamic Progress Bar
    const percent = (currentStage / 4) * 100;
    progressBar.style.width = percent + "%";

    if (currentStage === 4) renderReview();
}

// Requirement 2: Strict Validation at each stage
function validateStage() {
    if (currentStage === 1) {
        const name = document.getElementById('fname').value;
        if (name.length < 2) { alert("Name too short"); return false; }
        formData.name = name;
    } 
    else if (currentStage === 2) {
        const email = document.getElementById('email').value;
        if (!email.includes('@')) { alert("Invalid email"); return false; }
        formData.email = email;
    } 
    else if (currentStage === 3) {
        const pass = document.getElementById('pass').value;
        if (pass.length < 8) { alert("Password must be 8+ chars"); return false; }
        formData.password = pass;
    }
    return true;
}

function nextStage() {
    if (validateStage()) {
        currentStage++;
        updateUI();
    }
}

function prevStage() {
    currentStage--;
    updateUI();
}

function renderReview() {
    document.getElementById('reviewData').innerText = 
        `Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ********`;
}

// Requirement 5: Prevent form submission if validation fails
document.getElementById('workflowForm').addEventListener('submit', function(e) {
    if (currentStage < 4 || !validateStage()) {
        e.preventDefault();
        alert("Workflow incomplete!");
    } else {
        alert("Form Submitted Successfully!");
    }
});