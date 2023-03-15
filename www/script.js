
//lista de tareas
let todos = [
    { "id": 1, "title": "Aprender JavaScript", "done": false },
    { "id": 2, "title": "Terminar los ejercicios", "done": false },
    { "id": 3, "title": "Hacer 100 sentadillas", "done": true }
  ];

const tablaTareas = document.getElementById('tabla-tareas');

displayTodos(); 

function displayTodos() {
    tablaTareas.innerHTML = '';
    todos.forEach(function(tarea) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.textContent = tarea.title;
        fila.appendChild(celda);
        tablaTareas.appendChild(fila);
    });
}
//función que añade una nueva tarea a la lista de tareas


function addTodo() {
    let newTodo = document.getElementById("nombre_lista");
    todos.push({ "id": todos.length + 1, "title": newTodo.value, "done": false });

    newTodo.value = '';
    displayTodos();
    
  
}

//función que elimina una tarea en concreto de la lista de tareas
function deleteTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });
    displayTodos();
}
