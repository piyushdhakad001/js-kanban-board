const addButton = document.querySelector(".add-button");
const taskContainer = document.querySelectorAll(".task-cont");

let tasks =  [];
let draggedTask = null;
render();


addButton.addEventListener("click", () => {

  const taskName = prompt("Enter task name:");

  if (!taskName) return;

  tasks.push({
    id: Date.now(),
    text: taskName,
    column: 0,
  });
  
  render()
});


function render(){
 
  tasks.forEach((taskData) => {
    const task = document.createElement("p");
    task.classList.add("task");
    task.textContent = taskData.text;
    task.draggable = true;

    // allow dragging 
    task.setAttribute("draggable", "true");

    // start dragging
    task.addEventListener("dragstart", () => {
      draggedTask = taskData.id;
    })

    // finish dragging 
    task.addEventListener("dragend", () => {
      draggedTask = null;
    })
    taskContainer[taskData.column].appendChild(task);
  })
}

taskContainer.forEach((container, index) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // drop
  container.addEventListener("drop", ()=> {
    const task = tasks.find((t) => t.id === draggedTask );

    task.column = index;

    
  })
})