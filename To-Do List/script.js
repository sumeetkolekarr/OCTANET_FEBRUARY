let todos = [];
      let completed = [];

      function loadTodos() {
        const todosJSON = localStorage.getItem("todos");
        const completedJSON = localStorage.getItem("completed");
        if (completedJSON.length === 0) {
          let a = 0;
        } else {
          a = JSON.parse(completedJSON).length;
        }
        if (todosJSON.length === 0) {
          let b = 0;
        } else {
          b = JSON.parse(todosJSON).length;
        }
        let percent = (a / (a + b)) * 100;
        p = document.getElementById("percent")
        d = document.getElementById("decimal")
        p.innerHTML = `${Math.round(percent)}%`;
        d.innerHTML = `${(JSON.parse(completedJSON).length)}/${(JSON.parse(completedJSON).length)+(JSON.parse(todosJSON).length)}`
        console.log(percent);
        console.log(JSON.parse(todosJSON).length)
        if (todosJSON !== null) {
          todos = JSON.parse(todosJSON);
          completed = JSON.parse(completedJSON) || [];
          displayTodos();
        }
      }

      function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("completed", JSON.stringify(completed));
      }

      function displayTodos() {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
          const li = createTodoElement(todo, index);
          todoList.appendChild(li);
        });

        const completedList = document.getElementById("completedList");
        completedList.innerHTML = "";
        completed.forEach((todo, index) => {
          const li = createTodoElement(todo, index, true);
          completedList.appendChild(li);
        });

        saveTodos();
      }

      function createTodoElement(todo, index, isCompleted = false) {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${todo}`;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "editButton";
        editButton.onclick = function () {
          editTodo(index, isCompleted);
        };

        const doneButton = document.createElement("button");
        doneButton.textContent = isCompleted ? "Undone" : "Done";
        doneButton.className = isCompleted ? "undoneButton" : "doneButton";
        doneButton.onclick = function () {
          toggleDone(index, isCompleted);
          location.reload()
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = function () {
          removeTodo(index, isCompleted);
        };

        li.appendChild(editButton);
        li.appendChild(doneButton);
        li.appendChild(deleteButton);

        if (isCompleted) {
          li.classList.add("done");
        }

        return li;
      }

      function editTodo(index, isCompleted) {
        const targetArray = isCompleted ? completed : todos;
        const newTodo = prompt("Edit your todo:", targetArray[index]);
        if (newTodo !== null) {
          targetArray[index] = newTodo.trim();
          displayTodos();
          Swal.fire("ToDo Edited Successfully!", "", "success");
        }
      }

      function toggleDone(index, isCompleted) {
        if (!isCompleted) {
          const completedTodo = todos.splice(index, 1)[0];
          completed.push(completedTodo);
        } else {
          const activeTodo = completed.splice(index, 1)[0];
          todos.push(activeTodo);
        }
        displayTodos();
      }

      function addTodo() {
        const todoInput = document.getElementById("todoInput");
        const todoText = todoInput.value.trim();

        if (todoText !== "" && todos.length < 7) {
          todos.push(todoText);
          todoInput.value = "";
          displayTodos();
          Swal.fire("ToDo Added Successfully!", "", "success");
        } else if (todoText === "") {
          Swal.fire("Enter the Task!", "", "warning");
        } else if (todos.length >= 7) {
          Swal.fire("Complete the earlier Given Tasks!", "", "warning");
        }
      }

      function removeTodo(index, isCompleted) {
        const targetArray = isCompleted ? completed : todos;
        if (index >= 0 && index < targetArray.length) {
          targetArray.splice(index, 1);
          displayTodos();
        }
      }

      loadTodos();