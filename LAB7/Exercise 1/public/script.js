const API_URL = "http://localhost:3000/notes";

//view
async function fetchNotes() {
    const res = await fetch(API_URL);
    const notes = await res.json();
    const container = document.getElementById('notes-list');
    container.innerHTML = notes.map(note => `
        <div class="note-card">
            <h3>${note.title} (${note.subject})</h3>
            <p>${note.description}</p>
            <button onclick="deleteNote('${note._id}')">Delete</button>
            <button onclick="editNote('${note._id}')">Edit</button>
        </div>
    `).join('');
}

//create
async function addNote() {
    const data = {
        title: document.getElementById('title').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    fetchNotes();
}

//delete
async function deleteNote(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
}

//update
async function editNote(id) {
    const newTitle = prompt("Enter new title:");
    const newDesc = prompt("Enter new description:");
    
    if (newTitle && newDesc) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDesc })
        });
        fetchNotes();
    }
}

fetchNotes();