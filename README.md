### Ángel José Mancha Núñez
# HTTP To-do List Description

This application serves as a to-do list where users interact with it trough gestures.

![visualizador](media/lista.png) 

- In order to remove a task, just perform a **quick swipe** to the right.

![visualizador](media/remove.png) 

- To mark a task as completed, **press and hold** the corresponding task.

![visualizador](media/done.png) 

- To unmark a task as completed, also **press and hold** the same task. 
- In order to add new tasks, just **type** them and it will be added to the list.

![visualizador](media/add.png) 

The technology that relies behind is based on a **http server** which handles the **json** in which all the tasks are stored and updates it according to the petitions from the user.

# Deployment
```bash
node ./index.js
  ```
