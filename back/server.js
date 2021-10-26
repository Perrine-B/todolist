const express = require("express");
const app = express();
const port = 3006
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(require("./routes.js"));
app.listen(port, () => console.log(`LE TODO LIST IS ALIVEEEEUH sur le port ${port}`))


