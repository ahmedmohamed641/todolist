/*
1. Add Task
2. Edit Task
3. Complete Task
4. Remove Task
*/

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addTaskButton = document.getElementById('add-task-btn');
const ADD_TASK_BTN = 'add-task-btn';
const EDIT_BTN_ID = 'edit-btn-id';
const COMPLETE_BTN_ID = 'complete-btn-id';
const DELETE_BTN_ID = 'delete-btn-id';
const TODO_ITEM_ID = 'todo-item-id';
const CHECK_INPUT_ID = 'check-input-id';
const todoItems = [];
let index = 0;
const test = 'test';

window.onload = function () {
 loadTasks();
};

addTaskButton.addEventListener('click', addTask);

window.addEventListener('click', function (e) {
 const id = e.target.id;

 switch (id) {
  case EDIT_BTN_ID:
   editTask(e);
   break;
  case CHECK_INPUT_ID:
   completeTask(e);
   break;
  case DELETE_BTN_ID:
   removeTask(e);
   break;
 }

 saveTasks();
});

function addTask() {
 if (inputBox.value === '') {
  return;
 }

 index++;

 const parentElement = document.createElement('li');
 parentElement.setAttribute('data-index', index);
 parentElement.innerHTML = createTodo(inputBox.value);

 listContainer.appendChild(parentElement);

 /*
 const item = document.createElement('li');
 item.innerHTML = inputBox.value;
 listContainer.appendChild(item);
 item.setAttribute('id', 'todo-item-id');
 item.setAttribute('class', 'animate-left');
 item.setAttribute('data-index', index);

 const checkInput = document.createElement('input');
 checkInput.type = 'checkbox';
 item.appendChild(checkInput);
 checkInput.setAttribute('class', 'checkbox-input');
 checkInput.setAttribute('id', 'check-input-id');
 checkInput.classList.add('animate-opacity-delay');

 const editButton = document.createElement('div');
 editButton.innerHTML = '&#9998;';
 item.appendChild(editButton);
 editButton.setAttribute('id', 'edit-btn-id');
 editButton.setAttribute('class', 'edit-button');
 editButton.classList.add('animate-opacity');

 const deleteButton = document.createElement('span');
 deleteButton.innerHTML = '\u00d7';
 item.appendChild(deleteButton);
 deleteButton.classList.add('animate-opacity');
 deleteButton.setAttribute('id', 'delete-btn-id');
 */

 saveTasks();
 inputBox.value = '';

 todoItems.push({
  element: parentElement,
  id: String(index),
 });
 console.log(typeof index);
 console.log(typeof parentElement.getAttribute('data-index'));
}

let toggleText = false;

function editTask(e) {
 toggleText = !toggleText;
 const todo = getTodoItem(e.target.parentElement.getAttribute('data-index'));
 todo.element.contentEditable = toggleText;
}

function completeTask(e) {
 const todo = getTodoItem(e.target.parentElement.getAttribute('data-index'));
 todo.element.classList.toggle('checked');
}

function removeTask(e) {
 const todo = getTodoItem(e.target.parentElement.getAttribute('data-index'));
 console.log(typeof todo.id);
 todo.element.remove();
 todoItems.splice(todoItems.indexOf(todo), 1);
}

function getTodoItem(id) {
 const todo = todoItems.find((el) => el.id === id);

 return todo;
}

function createTodo(text) {
 return ` <p>${text}</p>
          <div">
            <button>edit</button>
            <button>remove</button>
          </div>
    `;
}

function saveTasks() {
 localStorage.setItem('data', listContainer.innerHTML);
}

function loadTasks() {
 listContainer.innerHTML = localStorage.getItem('data');
}

localStorage.clear();
