let students = []; 

//Fetch API
async function loadStudents() {
    try {
        const response = await fetch('./students.json');
        if (!response.ok) throw new Error("Failed to load JSON");
        
        students = await response.json();
        displayStudents();
    } catch (error) {
        console.error("Parsing Error:", error);
        alert("Error loading student data. Ensure you are using a local server.");
    }
}

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button onclick="updateMarks(${index})">Edit Marks</button>
                <button onclick="updateCourse(${index})">Edit Course</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

//create
function addStudent() {
    const id = document.getElementById("studId").value.trim();
    const name = document.getElementById("studName").value.trim();
    const course = document.getElementById("studCourse").value.trim();
    const marks = document.getElementById("studMarks").value.trim();

    if (!id || !name || !course || !marks) {
        alert("All fields are required!");
        return;
    }

    const newStudent = { id, name, course, marks: parseInt(marks) };
    students.push(newStudent);
    displayStudents();
    clearInputs();
}

//update
function updateMarks(index) {
    const newMarks = prompt("Enter new marks for " + students[index].name);
    if (newMarks !== null && !isNaN(newMarks)) {
        students[index].marks = parseInt(newMarks);
        displayStudents();
    }
}

function updateCourse(index) {
    const newCourse = prompt("Enter new course for " + students[index].name);
    if (newCourse !== null) {
        students[index].course = newCourse;
        displayStudents();
    }
}

//delete
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        displayStudents();
    }
}

function clearInputs() {
    document.querySelectorAll("input").forEach(input => input.value = "");
}

window.onload = loadStudents;