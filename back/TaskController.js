let db = require('./db');

async function getTasks(){
  return { db };
}

async function addTask(newTask){
  db = [...db, newTask];
  return { db }
}

module.exports = {
    getTasks,
    addTask
}