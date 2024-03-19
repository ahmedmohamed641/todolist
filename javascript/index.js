const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")
const addTaskButton = document.getElementById('add-task-btn')
const ADD_TASK_BTN = "add-task-btn"
const EDIT_BTN_ID = "edit-btn-id"
const COMPLETE_BTN_ID = "complete-btn-id"
const DELETE_BTN_ID = "delete-btn-id"
const TODO_ITEM_ID = "todo-item-id"
const CHECK_INPUT_ID = "check-input-id"
const todoItems = [];

window.onload = function() {
    loadTasks()
  }

addTaskButton.addEventListener('click', addTask)

window.addEventListener('click', function(e) {
  const id = e.target.id;

  switch(id) { 
    case EDIT_BTN_ID:
        editTask(e)
      break;
    case CHECK_INPUT_ID:
        completeTask(e)
      break;
    case DELETE_BTN_ID:
        removeTask(e)
      break;
  }
  
  saveTasks()
})


function addTask() {  
    if (inputBox.value === "") {
        return;
      }  
      const item = document.createElement("li");
      item.innerHTML = inputBox.value;
      listContainer.appendChild(item);
      item.setAttribute("id", "todo-item-id");
      item.setAttribute("class", "animate-left");

      const checkInput = document.createElement("input")
      checkInput.type = "checkbox"
      listContainer.appendChild(checkInput)
      checkInput.setAttribute("class", "checkbox-input")
      checkInput.setAttribute("id", "check-input-id")
      checkInput.classList.add("animate-opacity-delay");

      const editButton = document.createElement("div");
      editButton.innerHTML = "&#9998;";
      listContainer.appendChild(editButton);
      editButton.setAttribute("id", "edit-btn-id");
      editButton.setAttribute("class", "edit-button");
      editButton.classList.add("animate-opacity");

      const deleteButton = document.createElement("span");
      deleteButton.innerHTML = "\u00d7";
      listContainer.appendChild(deleteButton);
      deleteButton.classList.add("animate-opacity");
      deleteButton.setAttribute("id", "delete-btn-id")

    saveTasks()
    inputBox.value = "";
  }
  console.log(todoItems)

  let toggleText = false;

function editTask(e) {
        toggleText = !toggleText;
        e.target.contentEditable = false
        e.target.previousElementSibling.previousElementSibling.contentEditable = toggleText;
}

function completeTask(e) {
  e.target.previousElementSibling.classList.toggle("checked")
}

function removeTask(e) {
      e.target.previousElementSibling.previousElementSibling.previousElementSibling.remove();
       e.target.previousElementSibling.previousElementSibling.remove();
        e.target.previousElementSibling.remove();
        e.target.remove();
} 

function saveTasks() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadTasks() {
        listContainer.innerHTML = localStorage.getItem("data");
}

localStorage.clear()