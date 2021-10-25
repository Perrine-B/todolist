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

//   router.delete('/', async function(req, res, next) {
//     try {
//         Effacer une liste
//       res.json(await .fetchPokemons());
//     } catch (err) {
//       console.error(`Error while getting pokemons `, err.message);
//       next(err);
//     }
//   });

//   router.put('/', async function(req, res, next) {
//     try {
//         Modifier une liste 
//       res.json(await getAll.fetchPokemons());
//     } catch (err) {
//       console.error(`Error while getting pokemons `, err.message);
//       next(err);
//     }
//   });

module.exports = router;