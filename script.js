let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks on page
function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
}

// Toggle complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Filter tasks
function filterTasks(type) {
    renderTasks(type);
}

// Initial load
renderTasks();