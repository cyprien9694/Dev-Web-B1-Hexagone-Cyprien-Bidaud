//script.js
let toDoList = [];
let count = 1;
const button = document.getElementById("add-task")
button.addEventList("click",()> => {
    addtoDo
})
function addtoDo(text) {
    toDoList.push({name: text, completed: false, id: count++});
    count++;
    const li = document.createElement("li"); // Create a new list item
    li.textContent = text; // Set the text content of the list item
    li.addEventListener("click", () => {
        completed(count)
        li.textdecoration = "line-through"; // Add line-through style to the list item
        )
    
}
function displayToDoList() {
toDoList.forEach((toDo, i) => {
    console.log(toDo.name,toDo.completed ? "completed" : "incompleted",toDo.id);
    console.log("ID:", i);
    });
}
function completed(id) {
    toDoList.forEach((toDo) => {
        if (toDo.id === id) {
            toDo.completed = true;
        }
    });
}
function removetoDo(id) {
    toDoList.forEach((toDo, i) => {
        if (toDo.id === id) {
            toDoList.splice(i, 1);
        }
    });
}

addtoDo("Hello");
addtoDo("World");
addtoDo("!");
removetoDo(2);
displayToDoList();
completed(3);