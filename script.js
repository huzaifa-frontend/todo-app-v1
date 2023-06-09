let savedTasks = localStorage.getItem('todoList');
let todoList = savedTasks ? JSON.parse(savedTasks) : [];


function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  todoList.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Undo' : 'Done'}</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
}


function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      text: taskText,
      completed: false
    };

    todoList.push(newTask);
    taskInput.value = '';

    saveTasks();
    displayTasks();
  }
}


function toggleTaskStatus(index) {
  todoList[index].completed = !todoList[index].completed;

  saveTasks();
  displayTasks();
}


function deleteTask(index) {
  todoList.splice(index, 1);

  saveTasks();
  displayTasks();
}


function saveTasks() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', displayTasks);
