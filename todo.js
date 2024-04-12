document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todoList");
  const newTodoInput = document.getElementById("newTodoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const status = document.getElementById("status");

  let completedTodos = 0;
  let totalTodos = 0;

  // Fetch todos from the API
  async function fetchTodos() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/"
      );
      const todos = await response.json();
      renderTodos(todos.slice(0, 3)); // Display only the first 5 todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  // Render todos
  function renderTodos(todos) {
    todoList.innerHTML = "";
    totalTodos = todos.length;
    completedTodos = todos.filter((todo) => todo.completed).length;
    todos.forEach((todo) => {
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
    });
    updateStatus();
  }

  // Update status
  function updateStatus() {
    status.textContent = `${completedTodos}/${totalTodos}`;
  }

  // Create a todo item element
  function createTodoItem(todo) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo");
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <label>${todo.title}</label>
      <input type="text" class="edit-input" value="${todo.title}">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <button class="save-btn">Save</button>
    `;

    const editBtn = todoItem.querySelector(".edit-btn");
    const saveBtn = todoItem.querySelector(".save-btn");
    const deleteBtn = todoItem.querySelector(".delete-btn");
    const label = todoItem.querySelector("label");
    const editInput = todoItem.querySelector(".edit-input");
    const checkbox = todoItem.querySelector("input[type='checkbox']");

    // Initially hide the save button
    saveBtn.style.display = "none";

    // Checkbox change event
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        label.style.textDecoration = "line-through";
        completedTodos++;
      } else {
        label.style.textDecoration = "none";
        completedTodos--;
      }
      updateStatus();
    });

    // Edit button click event
    editBtn.addEventListener("click", () => {
      editBtn.style.display = "none";
      saveBtn.style.display = "inline";
      deleteBtn.style.display = "none";
      editInput.style.display = "inline";
      label.style.display = "none";
    });

    // Save button click event
    saveBtn.addEventListener("click", () => {
      label.textContent = editInput.value;
      editBtn.style.display = "inline";
      saveBtn.style.display = "none";
      deleteBtn.style.display = "inline";
      editInput.style.display = "none";
      label.style.display = "inline";
    });

    // Delete button click event
    deleteBtn.addEventListener("click", () => {
      if (checkbox.checked) {
        completedTodos--;
      }
      todoItem.remove();
      totalTodos--;
      updateStatus();
    });

    return todoItem;
  }

  // Add new todo
  addTodoBtn.addEventListener("click", () => {
    const newTodoTitle = newTodoInput.value.trim();
    if (newTodoTitle) {
      const newTodo = {
        title: newTodoTitle,
        completed: false,
      };
      const newTodoItem = createTodoItem(newTodo);
      todoList.appendChild(newTodoItem);
      newTodoInput.value = ""; // Clear input after adding
      totalTodos++;
      updateStatus();
    }
  });

  // Initial fetch of todos
  fetchTodos();
});
