/**
 * Todolist
 */
 let tasks = [
    
  ];
  
  
  var app = {
  
    init: function() {
      
      app.TodoZone = document.getElementById('todo');
      app.TodoZone.innerHTML = '';
      app.createForm();
      app.createCounter();
      app.createList();
    },
    createForm: () => {
    
      const form = document.createElement('form');
      app.input = document.createElement('input');
      app.input.id = "todo-input";
      app.input.placeholder = "Saisissez une tâche"
      form.appendChild(app.input);
      form.addEventListener('submit', app.handleSubmit);
  
      app.TodoZone.appendChild(form);
    },
    handleSubmit: (evt) => {
      // lock reload
      evt.preventDefault();
      console.log('Touche entrée appuyée');

      const todoObject = {
        text: app.input.value,
        done: false
      };
      tasks.push(todoObject);
      app.init();
  
  
    },
    createCounter: () => {
      app.counter = document.createElement('p');
      app.counter.id = "todo-counter";
      app.updateCounter();
      app.TodoZone.appendChild(app.counter);
    },
    updateCounter: () => {
      const notDoneTodos = tasks.filter((todoObject) => {
       
        return todoObject.done === true;
      });
  
      if (notDoneTodos.length <= 1) {
        app.counter.textContent = `${notDoneTodos.length} tâche terminée`; 
      } else {
        app.counter.textContent = `${notDoneTodos.length} tâches terminées`; 
      }
    },
    createList: () => {
    
      app.todoList = document.createElement('ul');
      app.todoList.id = "todo-list";
      app.TodoZone.appendChild(app.todoList);
      tasks.forEach((todoObject) => {
        app.createTodo(todoObject);
      });
    },

    createTodo: (todoObject) => {
      
      const todo = document.createElement('li');
      const checkbox = document.createElement('input');
      const label = document.createElement('label');
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
  
      todo.className = 'todo';
      checkbox.type = 'checkbox';
      checkbox.id = todoObject.text;
      label.textContent = todoObject.text;
      label.setAttribute('for', todoObject.text);
      label.className = "todo-text";
      deleteButton.textContent = "Supprimer"
  
      checkbox.addEventListener('change', (evt) => {
        app.handleTodoCheck(todoObject);
      });
  
      deleteButton.addEventListener('click', () => {
        app.handleRemoveTodo(todoObject);
      })
  
      if (todoObject.done) {
        todo.className = 'todo todo--done';
        checkbox.checked = true;
      }
  
      todo.appendChild(checkbox);
      todo.appendChild(label);
      todo.appendChild(deleteButton);
  
      app.todoList.appendChild(todo);
      
    },
    handleTodoCheck: (todoObject) => {
      todoObject.done = !todoObject.done;
      app.init();
    },
    handleRemoveTodo: (todoObject) => {
      console.log(todoObject);
      const newList = tasks.filter((todoOriginale) => {
        return todoOriginale !== todoObject
      });
      console.log(newList);
      tasks = newList;
      app.init();
    }
  
    
  };

  
  
  document.addEventListener('DOMContentLoaded', app.init);