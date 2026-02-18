
const studentForm = document.getElementById('studentForm');
const studentTable = document.querySelector('#studentTable tbody');
const messageBox = document.getElementById('message');

let students = [];
let isEditing = false;


const xhttp = new XMLHttpRequest();
xhttp.open('GET', './students.json', true);

xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            try {
                students = JSON.parse(xhttp.responseText);
                renderTable();
            } catch (e) {
                showMessage("Error parsing JSON data.", "error");
            }
        } else if (xhttp.status === 404) {
            showMessage("Error 404 : Database Not Found.", "error");
        } else {
            showMessage("Error 500 : Server Error.", "error");
        }
    }
};
xhttp.send();


function renderTable() {
    studentTable.innerHTML = "";
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dept}</td>
            <td>${student.marks}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editStudent('${student.id}')">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}


studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentData = {
        id: document.getElementById('studentId').value.trim(),
        name: document.getElementById('name').value.trim(),
        dept: document.getElementById('dept').value.trim(),
        marks: document.getElementById('marks').value.trim()
    };

    if (isEditing) {
        const index = students.findIndex(s => s.id === studentData.id);
        students[index] = studentData;
        showMessage("Student updated successfully!", "success");
        finishUpdate();
    } else {
        const clash = students.some(s => s.id === studentData.id);
        
        if (clash) {
            showMessage("Error: Student ID already exists!", "error");
        } else {
            students.push(studentData);
            showMessage("Student added successfully!", "success");
            resetForm();
        }
    }
    renderTable();
});

//delete
function deleteStudent(id) {
    if (confirm("Are you sure you want to remove this student?")) {
        students = students.filter(s => s.id !== id);
        renderTable();
        showMessage("Record deleted.", "success");
    }
}

//edit
function editStudent(id) {
    const student = students.find(s => s.id === id);
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentId').readOnly = true; //ID blocked
    document.getElementById('name').value = student.name;
    document.getElementById('dept').value = student.dept;
    document.getElementById('marks').value = student.marks;
    
    isEditing = true;
    document.querySelector('.btn-save').textContent = "Update Student";
}


function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = type; 
    setTimeout(() => { messageBox.className = ""; }, 3000);
}

function resetForm() {
    studentForm.reset();
}

function finishUpdate() {
    isEditing = false;
    document.getElementById('studentId').readOnly = false;
    document.querySelector('.btn-save').textContent = "Add Student";
    resetForm();
}
