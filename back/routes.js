const express = require('express');
const tasks = require('./db.js');
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
      console.log("ici", taskController.getTasks());
      res.json(await taskController.getTasks()).status(200);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  });

//   router.post('/todo/create', async function(req, res, next) {
//     try {
//         Methode de crea
//       res.json(await post.fetchPokemons());
//     } catch (err) {
//       console.error(`Error while getting pokemons `, err.message);
//       next(err);
//     }
//   });

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