
//lista de tareas
let todos = [
    { "id": 1, "title": "Aprender JavaScript", "done": false },
    { "id": 2, "title": "Terminar los ejercicios", "done": false },
    { "id": 3, "title": "Hacer 100 sentadillas", "done": true }
  ];

const listaTareas = document.getElementById('lista-tareas');

displayTodos(); 

function displayTodos() {
    listaTareas.innerHTML = '';
    todos.forEach(function(tarea) {
        const itemLista = document.createElement('li');
    
        // Agrega la clase "hecho" si la tarea está completada
    // if (tarea.done) {
        //  itemLista.classList.add('hecho');
        //}
    
        // Agrega el texto de la tarea al elemento <li>
        itemLista.textContent = tarea.title;
    
        // Agrega el elemento <li> al elemento HTML de la lista
        listaTareas.appendChild(itemLista);
    });
}
//función que añade una nueva tarea a la lista de tareas


function addTodo() {
    let newTodo = document.getElementById("nombre_lista");
    todos.push({ "id": todos.length + 1, "title": newTodo.value, "done": false });

    newTodo.value = '';
    displayTodos();
    
  
}