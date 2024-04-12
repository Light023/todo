async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todos = await response.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  const todoListDiv = document.getElementById("todoList");
  todoListDiv.innerHTML = ""; // Clear previous content

  todos.forEach((todo) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", async () => {
      todo.completed = checkbox.checked;
      await updateTodo(todo);
    });

    const label = document.createElement("label");
    label.textContent = todo.title;

    const todoDiv = document.createElement("div");
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(label);

    todoListDiv.appendChild(todoDiv);
  });
}

async function updateTodo(todo) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const updatedTodo = await response.json();
  console.log("Updated todo:", updatedTodo);
}

// Fetch todos when the page loads
fetchTodos();
