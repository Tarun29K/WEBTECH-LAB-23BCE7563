// 1. Setup Selectors
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const columns = document.querySelectorAll('.column');

// 2. Add Task Functionality
addBtn.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName === "") return;

    createTask(taskName);
    taskInput.value = "";
});

function createTask(name) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.id = 'task-' + Date.now(); // Unique ID using timestamp
    card.draggable = true;

    const date = new Date().toLocaleDateString();
    card.innerHTML = `
        <strong>${name}</strong>
        <p>Created: ${date}</p>
        <span class="success-msg">Task Completed Successfully!</span>
    `;

    // Initialize drag event for this specific card
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    });

    document.getElementById('todo').appendChild(card);
}

// 3. Handle Column Drag & Drop Events
columns.forEach(column => {
    // Necessary to allow dropping
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
    });

    // Remove highlight when card leaves column area
    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    // Handle the actual drop
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('drag-over');

        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(draggedId);
        
        // Ensure we append to the column even if dropped on another card
        column.appendChild(draggedElement);
    });
});