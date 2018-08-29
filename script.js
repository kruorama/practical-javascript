var todoList = {
  todos: [],

  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },

  changeTodo: function(todoPosition, todoText) {
    this.todos[todoPosition].todoText = todoText;
  },

  deleteTodo: function(todoPosition) {
    this.todos.splice(todoPosition, 1);
  },

  toggleTodo: function(todoPosition) {
    this.todos[todoPosition].completed = !this.todos[todoPosition].completed;
  },

  toggleAll: function() {
    // if everything is true, make everything false. otherwise make everything true

    //get number of completed todos
    var completedTodos = 0;
     
    this.todos.forEach (function (todo) {
      if (todo.completed === true);
      completedTodos++
    });
    
    this.todos.forEach (function (todo) {
      if (completedTodos === this.todos.length) {
        todo.completed === false
      } else {
        todo.completed === true  
      };
    
    });
  },
};

// group handlers together - can reuse!
var handlers = {

  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },

  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById(
      'changeTodoPositionInput'
    );
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },

  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },

  toggleTodo: function() {
    var toggleTodoPositionInput = document.getElementById(
      'toggleTodoPositionInput'
    );
    todoList.toggleTodo(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value = '';
    view.displayTodos();
  },

  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = ''; // empty the list
    /*
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion;

      // adding 'completed'
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      };
      
      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    };
    */
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = "";
      
      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      };
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);  
  },
  
  createDeleteButton: function () {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  
  // get a click on Delete button, get its parent's id and run deleteTodo
  setUpEventListeners: function () {
    var todosUl = document.querySelector("ul");

    todosUl.addEventListener ("click", function(event) {
    // console.log(event.target.parentNode.id);
    var elementClicked = event.target;
    if (elementClicked.className === "deleteButton") {
      handlers.deleteTodo (parseInt(elementClicked.parentNode.id));
    };
    });
  
  },
};

// run the event listener
view.setUpEventListeners();
