const http = require("http");
const express = require("express");
const app = express();
const port = 3006
var cors = require('cors');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(cors())
app.use(require("./routes.js"));
app.listen(port, () => console.log(`LE TODO LIST IS ALIVEEEEUH sur le port ${port}`))


