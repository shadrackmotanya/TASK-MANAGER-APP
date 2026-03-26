let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(currentFilter);
}

function renderTasks(filter = "all") {
    currentFilter = filter;

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks
        .filter(t =>
            filter === "completed" ? t.completed :
            filter === "pending" ? !t.completed : true
        )
        .forEach(task => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <small>${task.createdAt ? new Date(task.createdAt).toLocaleString() : ""}</small>

                <div class="task-buttons">
                    <button data-action="toggle" data-id="${task.id}">✔</button>
                    <button data-action="edit" data-id="${task.id}">✎</button>
                    <button data-action="delete" data-id="${task.id}">✖</button>
                </div>
            `;

            list.appendChild(li);
        });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;

    tasks.push({
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now()
    });

    input.value = "";
    saveTasks();
}

function toggleTask(id) {
    const t = tasks.find(t => t.id === id);
    if (t) t.completed = !t.completed;
    saveTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
}

function editTask(id) {
    const t = tasks.find(t => t.id === id);
    if (!t) return;

    const val = prompt("Edit task:", t.text);
    if (val !== null) t.text = val.trim() || t.text;

    saveTasks();
}

document.getElementById("taskList").addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const { action, id } = btn.dataset;

    if (action === "toggle") toggleTask(id);
    if (action === "delete") deleteTask(id);
    if (action === "edit") editTask(id);
});

document.getElementById("taskInput").addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});

function filterTasks(type) {
    renderTasks(type);
}

renderTasks();

localStorage.clear(); // Clear localStorage for testing purposes