let startX = 0;
let endX = 0;
let startTime = 0;

const TIME_THRESHOLD= 200;
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



function detectar_swipe(){
    const items = document.querySelectorAll("td");

    items.forEach(item => {
    item.addEventListener("touchstart", e => {
        e.preventDefault();
        e.target.classList.remove("swiped");
        startX = e.targetTouches[0].screenX;
        startTime = e.timeStamp;

        timer = setInterval(() => {
            if (Date.now() - startTime >= TIME_THRESHOLD) {
                toggleDone(e.target);
                //vibrar(100);
                navigator.vibrate(100);
                clearInterval(timer);
            }
        }, 200);

    }, { passive: false });

    item.addEventListener("touchmove", e => {
        e.preventDefault();
        endX = e.changedTouches[0].screenX;
    }, { passive: false });

    item.addEventListener("touchend", e => {
        e.preventDefault();
        endTime = e.timeStamp;
        endX = e.changedTouches[0].screenX;
        clearInterval(timer);
        if (endTime - startTime < TIME_THRESHOLD && endX - startX > SPACE_THRESHOLD) {
            remove(e.target);
            //vibrar(300);
            navigator.vibrate(300);
        }
        
        
    });
    });
}

//función que muestra las tareas
/*function displayTodos() {
    tablaTareas.innerHTML = '';
    todos.forEach(function(tarea) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.textContent = tarea.title;
        fila.appendChild(celda);
        tablaTareas.appendChild(fila);
    });
}*/

//función que muestra las tareas y cambia el color a las tareas completadas
function displayTodos() {
    tablaTareas.innerHTML = '';
    todos.forEach(function(tarea) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.textContent = tarea.title;
        if (tarea.done) {
            celda.classList.add('done');
        }
        fila.appendChild(celda);
        tablaTareas.appendChild(fila);
    });
}


//función que cambia el atributo done de la tarea
const toggleDone = (element) => {
    //nombre de la tarea
    const titulo = element.innerHTML;
    //cambiar el atributo done de la tarea que coincide con el nombre de la tarea
    const index = todos.findIndex((tarea) => tarea.title === titulo);
    if (index !== -1) {
        todos[index].done = !todos[index].done;
    }
    displayTodos();
    detectar_swipe();
}

const add = () => {
    let newTodo = document.getElementById("input_tarea");
    //si el campo de texto está vacío, no se añade nada
    if (newTodo.value === '') {
        return;
    }
    todos.push({ "id": todos.length + 1, "title": newTodo.value, "done": false });

    newTodo.value = '';

    displayTodos();
    detectar_swipe();
    
  
}

const remove= (element) =>{
    //nombre de la tarea
    const titulo = element.innerHTML;
    //eliminar tarea de la lista que coincide con el nombre de la tarea
    const index = todos.findIndex((tarea) => tarea.title === titulo);
    if (index !== -1) {
    todos.splice(index, 1);
    }

    displayTodos();
    detectar_swipe();
}



const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);