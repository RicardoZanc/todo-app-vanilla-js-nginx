const div = document.querySelector('#todoList')
const doneUl = document.querySelector('#doneList')
const undoneUl = document.querySelector('#undoneList')
const addTask = document.querySelector('#addTask')

addTask.addEventListener('click', createTask)

async function createTask() {
    const taskName = prompt('Digite o nome da task a ser criada')

    console.log(JSON.stringify({taskName: taskName}))
    
    const response = await fetch('http://localhost:3000/tasks', {
        method: "POST",
        headers: {
            "auth": userEmail,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({taskName: taskName})
    })

    console.log(response)

    const resp = await response.json()
    if(resp.success){
        window.location.reload()
    } else {
        window.alert(resp.error)
    }
}

async function deleteTask(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "auth": userEmail
        }
    })
    const resp = await response.json();
    if(resp.success){
        window.location.reload();
    } else {
        window.alert(resp.error)
    }
}


async function getTodos(){
    const response = await fetch('http://localhost:3000/tasks', {
        headers: {
            "auth": userEmail
        }
    })
    const body = await response.json()
    return body
    
}

async function toggleTaskStatus(id){
    const response = await fetch(`http://localhost:3000/tasks/${id}/toggleStatus`, {
        method: "PATCH",
        headers: {
            "auth": userEmail
        }
    })
    const resp = await response.json()
    console.log(resp)
    if(resp.success){
        window.location.reload()
    } else {
        window.alert(resp.error)
    }
}

const doneTasks = [];
const undoneTasks = [];

getTodos().then(tasksList => {
    if(!tasksList.success){
        return window.alert(tasksList.error) 
    }
    tasksList.tasks.map(task => {
        task.done ? doneTasks.push(task) : undoneTasks.push(task)
    })

    populateTasks()
})

console.log(doneTasks)
console.log(undoneTasks)

function populateTasks(){
    doneTasks.map(task=>{
        doneUl.innerHTML += `
            <li>${task.name} <button onclick="toggleTaskStatus(${task.id})">Desafazer</button>
            <button onclick="deleteTask(${task.id})">Excluir</button>
            </li>
        `
    })

    undoneTasks.map(task=>{
        undoneUl.innerHTML += `
            <li>${task.name} <button onclick="toggleTaskStatus(${task.id})">Feita</button>
            <button onclick="deleteTask(${task.id})">Excluir</button>
            </li>
        `
    })
}