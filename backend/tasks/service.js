import { readDb, writeOnDb } from "../db/service-db.js";

async function getTasks(userEmail) {
  const users = await readDb();
  const indexUser = users.findIndex((user) => user.email == userEmail);
  if (indexUser < 0) {
    throw new Error("User not found");
  }

  const tasks = users[indexUser].tasks;

  if (!tasks) {
    return { tasks: [], tasksLenght: 0 };
  }

  return { tasks: tasks, tasksLenght: tasks.lenght };
}

async function createTask(userEmail, taskName) {
  if (!taskName) {
    throw new Error("Task name required");
  }

  const users = await readDb();
  const indexUser = users.findIndex((user) => user.email == userEmail);
  if (indexUser < 0) {
    throw new Error("User not found");
  }

  const userTasks = users[indexUser].tasks ? users[indexUser].tasks : [];

  let taskToCreateId;

  if (!userTasks.length) {
    taskToCreateId = 0;
  } else {
    taskToCreateId = userTasks[userTasks.length - 1].id + 1;
  }

  const taskToCreate = { id: taskToCreateId, name: taskName, done: false };

  userTasks.push(taskToCreate);

  users[indexUser].tasks = userTasks;

  await writeOnDb(users);

  return taskToCreate;
}

async function toggleStatusTask(userEmail, taskId) {
  const users = await readDb();

  const indexUser = users.findIndex((user) => user.email == userEmail);
  if (indexUser < 0) {
    throw new Error("User not found");
  }

  if(!users[indexUser].tasks || !users[indexUser].tasks.length){
    throw new Error('User has no tasks yet')
  }

  const indexTask = users[indexUser].tasks.findIndex(task => task.id == taskId)

  users[indexUser].tasks[indexTask].done = !users[indexUser].tasks[indexTask].done

  await writeOnDb(users)

  return users[indexUser].tasks[indexTask]
}

async function deleteTask(userEmail, taskId){
  if(!taskId){
    throw new Error("Task Id must be informed");
  }
  
  const users = await readDb();

  const indexUser = users.findIndex(user => user.email == userEmail);
  if (indexUser < 0) {
    throw new Error("User not found");
  }

  if(!users[indexUser].tasks || !users[indexUser].tasks.length){
    throw new Error('User has no tasks yet')
  }

  const indexTask = users[indexUser].tasks.findIndex(task => task.id == taskId)

  if(indexTask < 0){
    throw new Error('Task not found')
  }

  const removedTask = users[indexUser].tasks.splice(indexTask, 1)[0]

  await writeOnDb(users);

  return removedTask;
}

export { getTasks, createTask, toggleStatusTask, deleteTask };
