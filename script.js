let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {

    if (
      (filter === "active" && task.done) ||
      (filter === "done" && !task.done)
    ) return;

    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent = task.text;
    if (task.done) text.style.textDecoration = "line-through";

    // toggle done
    text.onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    // edit
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      let newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    // delete
    let delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

function setFilter(f) {
  filter = f;
  renderTasks();
}

// load tasks on start
renderTasks();
