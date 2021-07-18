const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos"; 

function addTodo() {
    let todolist = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;

    let todo = makeTodo(textTodo, timestamp, false);
    todolist.append(todo);
    clearTodo();
}

function makeTodo(todo, timestamp, isCompleted){
    let title = document.createElement("h2");
    title.innerText = todo;

    let tanggal = document.createElement("p");
    tanggal.innerText = timestamp;

    let textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(title,tanggal)

    let container = document.createElement("div");
    container.classList.add("item","shadow");

    container.appendChild(textContainer);
    if(isCompleted){
        container.append(createUndoButton(), createTrashButton());
    } else{
        container.append(createCheckButton());
    }
    

    return container;
}

function clearTodo(){
    document.getElementById("title").value="";
    document.getElementById("date").value="";
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
 
    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();
} 

function createCheckButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}

function removeTaskFromCompleted(taskElement) {
    taskElement.remove();
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, false);
    const listUnCompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    listUnCompleted.append(newTodo);
    taskElement.remove();
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}