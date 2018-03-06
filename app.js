const taskInput = document.querySelector('#task-input');
const form = document.querySelector('#input-form');
const taskList = document.querySelector('.tasks-list');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#task-filter');

// loading events
eventLoader();

function eventLoader(){
  //cheking DOM load and loading task from local storage
  document.addEventListener('DOMContentLoaded', tasksLoad);

  //adding eventlistener on form for entering task
  form.addEventListener('submit', enterTask);

  //adding event listener on ul list for task remove
  taskList.addEventListener('click', removeTask);

  //adding event listener on "clear task" button
  clear.addEventListener('click', clearTasks);
  //filter event
  filter.addEventListener('keyup', filterTask);
}

// task load from local storage
function tasksLoad() {
  let tasks;
  
  //cheking if local storege is empty if not loading tasks from storage
  if(localStorage.getItem('tasks') === null){
    tasks = []; //if storage is empty, create empty array 
  } else {
    // storage not empty parsing string to array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //setting li and span variables for constructing html elements
    const li = document.createElement("li");
    const span = document.createElement('span');

    // setting li class
    li.className = 'list-item';

    // setttin span class
    span.className = 'delete-item';

    // inserting icon into span element
    span.innerHTML = '<i class="far fa-trash-alt">';

    //assembling li element
    li.appendChild(document.createTextNode(task));
    li.appendChild(span);
    
    //inserting into ul element
    taskList.appendChild(li);
  });
}

function enterTask(e){

  //check if there is something in input field, if yes then enter task
  if(taskInput.value !== ""){ 
  
  //setting li and spand variables for constructing html elements
  const li = document.createElement("li");
  const span = document.createElement('span');

  // setting li class
  li.className = 'list-item';

  // setttin span class
  span.className = 'delete-item';

  // inserting icon into span element
  span.innerHTML = '<i class="far fa-trash-alt">';

  //assembling li element
  li.appendChild(document.createTextNode(taskInput.value));
  li.appendChild(span);
  
  //inserting into ul element
  taskList.appendChild(li);

  //save task in local storage
  taskSave(taskInput.value);

  // clearing input field
  taskInput.value = "";
  }

  e.preventDefault();
}

function removeTask(e){
  //cheking if event ocured on icon (event target parent has delete flag) 
  if(e.target.parentElement.classList.contains('delete-item')) {
    //deleting event target parent parent (li element)
    e.target.parentElement.parentElement.remove();}

    // removing task from local storage. 
    taskRemove(e.target.parentElement.parentElement);
}

//taks clear
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clearing local storage
  localStorage.clear();
}

//store task in local storage
function taskSave(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    // parsing string to array  in order to be able to add new record
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks)); // JSON.stringify converting object to string
}

//task remove from local storage
function taskRemove(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    // parsing string to array  in order to be able to add new record
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //selecting acording arrey element and removing it
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks)); //stringify and save tasks
}

//filter Task
function filterTask(e){
  const text = e.target.value;

  document.querySelectorAll('.list-item').forEach(function(task){
    const item = task.firstChild.textContent;
    
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'flex';
    } else{
      task.style.display = 'none';
    }
  });



}