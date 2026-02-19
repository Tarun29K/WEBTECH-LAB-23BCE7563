let xmlDoc = null;

//AJAX

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "./employees.xml", true);
xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            xmlDoc = xhttp.responseXML;
            if (!xmlDoc || xmlDoc.getElementsByTagName("parsererror").length > 0) {
                showMessage("Error: Malformed XML.", "error");
            } else {
                displayEmployees();
            }
        } else {
            showMessage("Error: Could not fetch XML file.", "error");
        }
    }
};
    xhttp.send();


function displayEmployees() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    
    const employees = xmlDoc.getElementsByTagName("employee");
    
    if (employees.length === 0) {
        showMessage("No records found.", "error");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        let id = employees[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
        let name = employees[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        let dept = employees[i].getElementsByTagName("department")[0].childNodes[0].nodeValue;
        let salary = employees[i].getElementsByTagName("salary")[0].childNodes[0].nodeValue;

        let row = `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${dept}</td>
            <td>${salary}</td>
            <td>
                <button onclick="updateDepartment('${id}')">Update Department</button>
                <button onclick="updateSalary('${id}')">Update Salary</button>
                <button onclick="deleteEmployee('${id}')">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    }
}

//create
function addEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    if (!id || !name || !dept || !salary) {
        showMessage("Please fill all fields.", "error");
        return;
    }

    const newEmp = xmlDoc.createElement("employee");
    
    const elements = { id, name, department: dept, salary };
    for (let key in elements) {
        let node = xmlDoc.createElement(key);
        node.appendChild(xmlDoc.createTextNode(elements[key]));
        newEmp.appendChild(node);
    }

    xmlDoc.documentElement.appendChild(newEmp);
    showMessage("Employee added successfully!", "success");
    displayEmployees();
}

//update
function updateSalary(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    let newSalary = prompt("Enter new salary:");
    
    if (newSalary) {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].getElementsByTagName("id")[0].childNodes[0].nodeValue === id) {
                employees[i].getElementsByTagName("salary")[0].childNodes[0].nodeValue = newSalary;
                showMessage("Salary updated.", "success");
                displayEmployees();
                return;
            }
        }
    }
}

function updateDepartment(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    let newDept = prompt("Enter new department:");
    
    if (newDept) {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].getElementsByTagName("id")[0].childNodes[0].nodeValue === id) {
                employees[i].getElementsByTagName("department")[0].childNodes[0].nodeValue = newDept;
                showMessage("Department updated.", "success");
                displayEmployees();
                return;
            }
        }
    }
}
//delete
function deleteEmployee(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].childNodes[0].nodeValue === id) {
            xmlDoc.documentElement.removeChild(employees[i]);
            showMessage("Employee deleted.", "success");
            displayEmployees();
            return;
        }
    }
}

function showMessage(msg, type) {
    const message = document.getElementById("message");
    message.innerText = msg;
    message.className = type;
}