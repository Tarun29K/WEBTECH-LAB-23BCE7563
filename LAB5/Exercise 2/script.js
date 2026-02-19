let libraryDoc = null;


const xhttp = new XMLHttpRequest();
xhttp.open("GET", "./books.xml", true);
xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        libraryDoc = xhttp.responseXML;
        displayBooks();
    }
};
    
xhttp.send();

function displayBooks() {
    const table = document.getElementById("bookTable");
    table.innerHTML = "";
    const books = libraryDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        let id = books[i].getElementsByTagName("id")[0].textContent;
        let title = books[i].getElementsByTagName("title")[0].textContent;
        let author = books[i].getElementsByTagName("author")[0].textContent;
        let status = books[i].getElementsByTagName("status")[0].textContent;

        let row = `<tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td class="${status.toLowerCase()}">${status}</td>
            <td>
                <button onclick="toggleStatus('${id}')">Toggle Status</button>
                <button onclick="deleteBook('${id}')">Remove</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    }
}

//create
function addBook() {
    const id = document.getElementById("bookId").value.trim();
    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();

    if (!id || !title || !author) {
        alert("All fields are required!");
        return;
    }

    const books = libraryDoc.getElementsByTagName("id");
    for (let i = 0; i < books.length; i++) {
        if (books[i].textContent === id) {
            alert("Book ID must be unique!");
            return;
        }
    }

    const newBook = libraryDoc.createElement("book");
    
    const createNode = (name, value) => {
        let node = libraryDoc.createElement(name);
        node.appendChild(libraryDoc.createTextNode(value));
        return node;
    };

    newBook.appendChild(createNode("id", id));
    newBook.appendChild(createNode("title", title));
    newBook.appendChild(createNode("author", author));
    newBook.appendChild(createNode("status", "Available"));

    libraryDoc.documentElement.appendChild(newBook);
    displayBooks();
}

//update
function toggleStatus(id) {
    const books = libraryDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            let status = books[i].getElementsByTagName("status")[0];
            status.textContent = (status.textContent === "Available") ? "Borrowed" : "Available";
            break;
        }
    }
    displayBooks();
}

//delete
function deleteBook(id) {
    const books = libraryDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            libraryDoc.documentElement.removeChild(books[i]);
            break;
        }
    }
    displayBooks();
}
