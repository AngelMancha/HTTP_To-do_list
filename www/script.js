let startX = 0;
let endX = 0;
let startTime = 0;

const TIME_THRESHOLD= 200;
const SPACE_THRESHOLD = 100;



//función que carga los datos del json a la variable lista_tareas
const loadTasks =() => {  
    fetch('/tasks/get')
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        lista_tareas = data;
        displaylista_tareas();
        detectar_gesto();
    }).catch(function(err) {
        console.log(err);
    });
    
}

//Función que guarda los datos de la variable lista_tareas en el json
const saveTasks = () => {
    fetch('/tasks/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lista_tareas, null, 2)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
  

//función que crea una tarea
const add = () => {
    let newTodo = document.getElementById("input_tarea");
    //si el campo de texto está vacío, no se añade nada
    if (newTodo.value === '') {
        return;
    }
    lista_tareas.push({ "id": lista_tareas.length + 1, "title": newTodo.value, "done": false });

    newTodo.value = '';

    displaylista_tareas();
    detectar_gesto();
    saveTasks();
  
}

//función que elimina una tarea
const remove= (element) =>{
    //nombre de la tarea
    const titulo = element.innerHTML;
    //eliminar tarea de la lista que coincide con el nombre de la tarea
    const index = lista_tareas.findIndex((tarea) => tarea.title === titulo);
    if (index !== -1) {
    lista_tareas.splice(index, 1);
    }

    displaylista_tareas();
    detectar_gesto();
    saveTasks();
}

//función que cambia el atributo done de la tarea
const toggleDone = (element) => {
    //nombre de la tarea
    const titulo = element.innerHTML;
    //cambiar el atributo done de la tarea que coincide con el nombre de la tarea
    const index = lista_tareas.findIndex((tarea) => tarea.title === titulo);
    if (index !== -1) {
        lista_tareas[index].done = !lista_tareas[index].done;
    }
    displaylista_tareas();
    detectar_gesto();
    saveTasks();
}



 

// funcion que detecta los gestos
function detectar_gesto(){
    const items = document.querySelectorAll("td");

    items.forEach(item => {
    item.addEventListener("touchstart", e => {
        e.preventDefault();
        startX = e.targetTouches[0].screenX;
        startTime = e.timeStamp;

        timer = setInterval(() => {
            if (Date.now() - startTime >= 2000) {
                toggleDone(e.target);
                setTimeout(function(){ modal_done(e.target); }, 500);
                setTimeout(function(){ modal_off(); }, 1100);
                navigator.vibrate(100);
                clearInterval(timer);
            }
        }, 1000);

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
            modal_eliminar();
            setTimeout(function(){ modal_off(); }, 1000);
            navigator.vibrate(300);
        }
        
        
    });
    });
}



//función que muestra las tareas y cambia el color a las tareas completadas
function displaylista_tareas() {
    tablaTareas.innerHTML = '';
    lista_tareas.forEach(function(tarea) {
        const fila = document.createElement('tr');
        const celda = document.createElement('td');
        celda.textContent = tarea.title;
        if (tarea.done) {
            celda.classList.remove('not-done');
            celda.classList.add('done');
        }
        else {
            celda.classList.remove('done');
            celda.classList.add('not-done');
        }     
        fila.appendChild(celda);
        tablaTareas.appendChild(fila);
    });
}


// funciones para añadir y eliminar los modales de tarea completada y tarea eliminada
function modal_eliminar(){
    let modal_content = document.getElementById("modal-content");
    let modal_container = document.getElementById("modal-container");
    modal_content.classList.add("modal_eliminar");
    modal_container.style.display = "block";
    modal_content.style.display = "block";
    modal_content.innerHTML="Tarea eliminada";
}

function modal_done(element){

    //si el elemento tiene el atributo done, se muestra el modal de tarea completada
    if(element.classList.contains("not-done")){

    let modal_content = document.getElementById("modal-content");
    let modal_container = document.getElementById("modal-container");
    
    modal_content.classList.add("modal_done");
    modal_container.style.display = "block";
    modal_content.style.display = "block";
    modal_content.innerHTML=" ✓ ";
    }
}


function modal_off(){
    let modal_content = document.getElementById("modal-content");
    let modal_container = document.getElementById("modal-container");
    modal_container.style.display = "none";
    modal_content.style.display = "none";
    modal_content.classList.remove("modal_done");
    modal_content.classList.remove("modal_eliminar");

}



//lista de tareas
let lista_tareas = [];

loadTasks();

const tablaTareas = document.getElementById('tabla-tareas');

const addButton = document.querySelector("#fab-add");

addButton.addEventListener("touchend", add);