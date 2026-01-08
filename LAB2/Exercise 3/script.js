
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const columns = document.querySelectorAll('.column');

// task
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

    //drag function for task
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    });

    document.getElementById('todo').appendChild(card);
}

// drag & drop event
columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        column.classList.remove('drag-over');

        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(draggedId);
        
        //append element to column
        column.appendChild(draggedElement);
    });
});