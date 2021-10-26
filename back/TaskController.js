let db = require('./db');

async function getTasks(){
  return { db };
}

async function addTask(newTask){
  const generateId = () => Math.floor(100000 + Math.random() * 900000);
  const id = generateId();
  const task = {...newTask, id}
  console.log("task created", task)
  db = [...db, task];
  return { db }
}

async function deleteTask(taskId){
  db = db.filter((task => task.id !== taskId))
  return { db }
}

async function updateTask(taskId, newTask){
  taskToUpdate = db.filter((task => task.id !== taskId));
  console.log("Method", newTask );
  // Pour le reste on verra
  return { db }
}

module.exports = {
    getTasks,
    addTask,
    deleteTask
}