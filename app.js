const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box')

let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list"))

const showTodo = () => {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status === "comleted" ? "checked" : "";
            li += `<li class="task">
                    <label for="${id}">
                        <input onclick = "updateStatus(this)" type="checkbox"  id="${id}" ${isCompleted}>
                        <p> ${isCompleted} ${todo.name}</p>
                    </label>
                    <div class="settings">
                    <i onclick = "showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <ul class="task-menu">
                        <li onclick = "editTask(${id}, '${todo.name}')"><i class="fas fa-pen"></i>Edite</li>
                        <li onclick = "deleteTask(${id})"><i class="fas fa-trash-alt"></i>Delete</li>
                    </ul>
                    </div>
            </li>`
            })
    }
    taskBox.innerHTML = li;
}
showTodo();

const showMenu = (selectedTask) => {
    let taskMenu = selectedTask.parentElement.lastElementChild; 
    taskMenu.classList.add("show");
    document.addEventListener('click', e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");

        }
    })
}

const deleteTask = (deleteId) => {
    todos.splice(deleteId, 1)
    localStorage.setItem("todo-list", JSON.stringify(todos))
    showTodo();
}

const editTask = (taskId, taskName) => {
    editId = taskId
    taskInput.value = taskName;
    //////////////////////////////////////////////////////////////////////////////
}


const updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentElement.lastElementChild; 
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed"
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending"
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!todos) {
            todos = []
        }
        taskInput.value = ""
        let taskInfo = { name: userTask, status: "pending" }
        todos.push(taskInfo)
        localStorage.setItem("todo-list", JSON.stringify(todos))
    }
    showTodo();

})

