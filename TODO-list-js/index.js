const tasks = [];

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).slice(-5)}`;
}

function addTask() {
  const inputField = document.getElementById('new-task');
  const newTaskValue = inputField.value.trim();

  if (newTaskValue !== '') {
    const uniqueId = generateUniqueId();
    tasks.push({ id: uniqueId, task: newTaskValue, completed: false });

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    listItem.setAttribute('data-task-id', uniqueId);

    const taskSpan = document.createElement('span');
    taskSpan.textContent = newTaskValue;
    listItem.appendChild(taskSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', handleDeleteClick);
    listItem.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', handleEditClick);
    listItem.appendChild(editBtn);

    listItem.addEventListener('click', function (event) {
      if (!event.target.matches('button')) {
        const taskId = listItem.getAttribute('data-task-id');
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
          listItem.classList.toggle('completed');
        }
      }
    });

    document.getElementById('todo-list').appendChild(listItem);
    inputField.value = '';
  }
}

function handleDeleteClick(e) {
  const parentLi = e.currentTarget.closest('li');
  const taskId = parentLi.getAttribute('data-task-id');

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }

  parentLi.remove();
}

function handleEditClick(e) {
  e.stopPropagation();

  const parentLi = e.currentTarget.closest('li');
  const taskId = parentLi.getAttribute('data-task-id');
  const newTaskName = prompt('Введите новое имя задачи:', '');

  if (newTaskName && newTaskName.trim() !== '') {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.task = newTaskName.trim();
      parentLi.firstElementChild.textContent = newTaskName.trim();
    }
  }
}

document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  addTask();
};
