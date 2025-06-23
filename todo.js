const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const prioritySelect = document.getElementById('priority-select');

// ✅ Save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      completed: li.classList.contains('completed'),
      priority: li.dataset.priority || 'low'
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ✅ Load tasks from local storage
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.priority, task.completed);
  });
}

// ✅ Create and add a task element
function createTaskElement(text, priority, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  li.dataset.priority = priority;
  li.classList.add(priority);

  if (completed) {
    li.classList.add('completed');
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  // ✅ Confirmation before delete
  deleteBtn.addEventListener('click', () => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      li.remove();
      saveTasksToLocalStorage();
    }
  });

  // ✅ Toggle completed status
  li.addEventListener('click', (e) => {
    if (e.target !== deleteBtn) {
      li.classList.toggle('completed');
      saveTasksToLocalStorage();
    }
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// ✅ Add task on button click
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskText !== '') {
    createTaskElement(taskText, priority);
    taskInput.value = '';
    saveTasksToLocalStorage();
  } else {
    alert('Please enter a task!');
  }
});

// ✅ Load saved tasks on page load
window.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
// clear all button
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
  }
});

//clear completed tasks
const deleteCompletedBtn = document.getElementById('delete-completed-btn');

deleteCompletedBtn.addEventListener('click', () => {
  const confirmDelete = confirm("Delete all completed tasks?");
  if (confirmDelete) {
    document.querySelectorAll('#task-list li.completed').forEach(li => li.remove());
    saveTasksToLocalStorage();
  }
});