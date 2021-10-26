const express = require('express');
const router = express.Router(); 
const taskController = require("./TaskController.js")

router.get('/', async function(req, res, next) {
    try {
      res.send("Coucou les moches");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/tasks', async function(req, res, next) {
    try {
      res.json(await taskController.getTasks()).status(200);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  });

  router.post('/tasks/add', async function(req, res, next) {
    try {
      // Ca ca récupère les données du post MAIS seulement en ajoutant le parse dans server.js
      taskController.addTask(req.body);
      res.send("created");
    } catch (err) {
      console.error(`Et nooon `, err.message);
      next(err);
    }
  });

  router.delete('/tasks/delete/:id', async function(req, res, next) {
    try {
      console.log(`Task n° ${req.params.id} is deleted`);
      taskController.deleteTask(req.params.id);
      res.send("deleted");
    } catch (err) {
      console.error(`Error on deleting task`, err.message);
      next(err);
    }
  });

  router.put('/tasks/update/:id', async function(req, res, next) {
    try {
      console.log(`Task n°${req.params.id} was updated`);
      taskController.updateTask(req.params.id, req.body);
    } catch (err) {
      console.error(`Error while getting pokemons `, err.message);
      next(err);
    }
  });

module.exports = router;