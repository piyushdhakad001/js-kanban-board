const addButton = document.querySelector(".add-button");
const taskContainer = document.querySelectorAll(".task-cont");

let draggedTask = null;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
render();

addButton.addEventListener("click", () => {
  const taskName = prompt("Enter task name:");

  if (!taskName) return;

  tasks.push({
    id: Date.now(),
    text: taskName,
    column: 0,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
});

function render() {
  // Clear all columns
  taskContainer.forEach(container => {
    container.innerHTML = "";
  });

  // Create every task again
  tasks.forEach((taskData) => {
    const task = document.createElement("p");
    task.classList.add("task");
    task.textContent = taskData.text;
    task.draggable = true;

    // DRAG FUNCTIONALITY-----------
    // Make task draggable
    task.setAttribute("draggable", "true");

    // start dragging
    task.addEventListener("dragstart", () => {
      draggedTask = taskData.id;
    });

    // Finish dragging
    task.addEventListener("dragend", () => {
      draggedTask = null;
    });

    // ------------------------

    taskContainer[taskData.column].appendChild(task);
  });
}

// // DROP FUNCTIONALITY---------------------------
taskContainer.forEach((container, index) => {
  // Required to allow dropping
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // Drop task
  container.addEventListener("drop", () => {
    const task = tasks.find((t) => t.id === draggedTask);

    task.column = index;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    render();
  });
});
// --------------------------------------------------
