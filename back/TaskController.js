const db = require('./db');

async function getTasks(){
  const rows = db;
  return { db };
}

module.exports = {
    getTasks
}