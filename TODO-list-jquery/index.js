const tasks = [];

function generateUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).slice(-5)}`;
}

function addTask() {
  const newTask = $('#new-task').val().trim();
  if (newTask !== '') {
    const uniqueId = generateUniqueId();
    tasks.push({ id: uniqueId, text: newTask, completed: false });

    const listItem = $('<li class="todo-item"></li>');
    listItem.attr('data-task-id', uniqueId); 

    const taskText = $('<span></span>').text(newTask);
    listItem.append(taskText);

    const deleteBtn = $('<button>❌</button>');
    deleteBtn.on('click', handleDeleteClick); 
    listItem.append(deleteBtn);

    const editBtn = $('<button>✏</button>');
    editBtn.on('click', handleEditClick);
    listItem.append(editBtn);

    listItem.on('click', function (event) {
      if ($(event.target).is('button')) return; 
      const taskId = $(this).attr('data-task-id');
      const task = tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        $(this).toggleClass('completed');
      }
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
  }
}

function handleDeleteClick(e) {
  const parentLi = $(this).closest('li');
  const taskId = parentLi.attr('data-task-id');

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
  }

  parentLi.remove();
}

function handleEditClick(e) {
  e.stopPropagation(); 

  const parentLi = $(this).closest('li');
  const taskId = parentLi.attr('data-task-id');

  const newTaskName = prompt('Введите новое имя задачи:');

  if (newTaskName && newTaskName.trim() !== '') {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      task.text = newTaskName.trim();
      parentLi.children('span').text(newTaskName.trim()); 
    }
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});
