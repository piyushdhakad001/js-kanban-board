const addButton = document.querySelector(".add-button");
const taskContainer = document.querySelectorAll(".task-cont");

let tasks =  [];


addButton.addEventListener("click", () => {
  const taskName = prompt("Enter task name:");

  if (!taskName) return;

  tasks.push({
    id: Date.now(),
    text: taskName,
    column: 0,
  });
  
  tasks.forEach((taskData) => {
    const task = document.createElement("p");
    task.classList.add("task");
    task.textContent = taskData.text;
    task.draggable = true;
    taskContainer[taskData.column].appendChild(task);
  })
});

