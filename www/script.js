let startX = 0;
let endX = 0;
let startTime = 0;

const TIME_THRESHOLD = 200;
const SPACE_THRESHOLD = 100;



//lista de tareas
let todos = [
    { "id": 1, "title": "Aprender JavaScript", "done": false },
    { "id": 2, "title": "Terminar los ejercicios", "done": false },
    { "id": 3, "title": "Hacer 100 sentadillas", "done": true }
  ];

const tablaTareas = document.getElementById('tabla-tareas');

displayTodos();
detectar_swipe(); 

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


const addTodo = () => {
    let newTodo = document.getElementById("nombre_lista");
    //si el campo de texto está vacío, no se añade nada
    if (newTodo.value === '') {
        return;
    }
    todos.push({ "id": todos.length + 1, "title": newTodo.value, "done": false });

    newTodo.value = '';
    displayTodos();
    detectar_swipe();
    
  
}

/*función que elimina una tarea en concreto de la lista de tareas
function deleteTodo(id) {
    todos = todos.filter(function(todo) {
        return todo.id !== id;
    });
    displayTodos();
    
}
*/


const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", addTodo);


function detectar_swipe(){
        const items = document.querySelectorAll("td");

        items.forEach(item => {
        item.addEventListener("touchstart", e => {
            e.preventDefault();
            e.target.classList.remove("swiped");
            startX = e.targetTouches[0].screenX;
            startTime = e.timeStamp;
        }, { passive: false });

        item.addEventListener("touchmove", e => {
            e.preventDefault();
            endX = e.changedTouches[0].screenX;
        }, { passive: false });

        item.addEventListener("touchend", e => {
            e.preventDefault();
            endTime = e.timeStamp;
            endX = e.changedTouches[0].screenX;
            if (endTime - startTime < TIME_THRESHOLD && endX - startX > SPACE_THRESHOLD) {
            delete_tarea(e.target);
            eliminar_tarea_de_la_lista(e.target);
            }
        });
        });
}

//eliminar elemento td
function delete_tarea(element) {

    element.parentNode.removeChild(element);
    
}

function eliminar_tarea_de_la_lista(element){
    const id = element.parentNode.dataset.id;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    displayTodos();
}
function handleSwipe(element) {
  element.classList.add("swiped");

}