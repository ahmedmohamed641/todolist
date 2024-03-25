const addTaskBtn = document.getElementById('addTaskBtn')
const todoContainer = document.getElementById("todoContainer")
const inputBox = document.getElementById('inputBox')
const ADD_TASK_BTN = 'addTaskBtn';
const EDIT_BTN_ID = 'editBtn';
const DELETE_BTN_ID = 'deleteBtn';
const CHECK_INPUT_ID = 'checkBtn';
const todoItems = [];
let index = 0;

addTaskBtn.addEventListener('click', addTask)

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
});

function addTask() {
 if (inputBox.value === "") {
  return;
 }

 index++;

 const listItem = document.createElement('li');
 listItem.setAttribute('data-index', index);
 listItem.innerHTML = createTodo(inputBox.value);
 todoContainer.appendChild(listItem);
 listItem.setAttribute('id', "todoItem" )
 listItem.classList.add('animate-left')
 inputBox.value = '';

 todoItems.push({
  element: listItem,
  id: String(index),
 });
}

let toggleText = false;

function editTask(e) {
 toggleText = !toggleText;
 const todo = getTodoItem(e.target.parentElement.parentElement.getAttribute('data-index'));
 const children = Array.from(todo.element.children)
 const p = children[0].querySelector("#todo-text")
 p.contentEditable = toggleText;
}

function completeTask(e) {
 e.target.nextElementSibling.classList.toggle("checked")
}

function removeTask(e) {
 const todo = getTodoItem(e.target.parentElement.parentElement.getAttribute('data-index'));
 todo.element.remove();
 todoItems.splice(todoItems.indexOf(todo), 1);
}

function getTodoItem(id) {
 const todo = todoItems.find((el) => el.id === id);
 return todo;
}

function createTodo(text) {
 return ` <span id="checkboxWrapper">
          <input class="checkbox-input" id="checkBtn" type="checkbox">
          <p id="todo-text">${text}</p>
       </span>

      <div id="buttonsConatiner">
         <button class="edit-btn" id="editBtn"> &#9998</button>
          <button id="deleteBtn"> \u00d7</button>
      </div>
    `;
}


/*  1-set maximum charchter length
    2- focus on input*/
    