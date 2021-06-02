// Get list from local storage
const list = JSON.parse(localStorage.getItem("groceryList")) || new Array();

// include items if we have them in local storage
if (list.length > 0) {
  for (let i = 0; i < list.length; i++) {
    addTodo(list[i]);
  }
}

// Selectors
document.querySelector("form").addEventListener("submit", handleSubmitForm);
document
  .querySelector("ul")
  .addEventListener("click", handleClickDeleteOrCheck);
document.getElementById("clear").addEventListener("click", handleClearAll);

// Event Handlers
function handleSubmitForm(e) {
  e.preventDefault();
  let input = document.querySelector("input");
  if (input.value !== "") {
    addTodo(input.value, true);
  }
  input.value = "";
}

function handleClickDeleteOrCheck(e) {
  if (e.target.name === "check-button") {
    checkTodo(e);
  } else if (e.target.name === "delete-button") {
    const value = e.target.parentNode.parentNode.children[0].innerHTML;
    deleteTodo(e, value);
  }
}

function handleClearAll() {
  document.querySelector("ul").innerHTML = "";
  localStorage.removeItem("groceryList");
}

// Helper Fn's
function addTodo(todo, addToStorage) {
  if (addToStorage) {
    list.push(todo);
    localStorage.setItem("groceryList", JSON.stringify(list));
  }

  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  li.innerHTML = `
        <div class="todo-item-wrapper">
            <span class="todo-item">${todo}</span>
            <div class="todo-item-buttons">
                <button name="check-button" class="todo-item-button success"><i class="fas fa-check-square"></i></button>
                <button name="delete-button" class="todo-item-button delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
    `;
  li.classList.add("todo-list-item");
  ul.appendChild(li);
}

function checkTodo(e) {
  const todo = e.target.parentNode.parentNode.children[0];
  const button = e.target;
  if (todo.style.textDecoration === "line-through") {
    todo.style.textDecoration = "none";
    e.target.style.color = "dimgray";
  } else {
    todo.style.textDecoration = "line-through";
    e.target.style.color = "greenyellow";
  }
}

function deleteTodo(e, value) {
  localStorage.setItem(
    "groceryList",
    JSON.stringify(list.filter((item) => item !== value))
  );

  const todo = e.target.parentNode.parentNode.parentNode;

  todo.classList.add("todo-list-item-fall");

  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
}
