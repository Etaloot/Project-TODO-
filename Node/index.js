const express = require('express')
const server = express()
const cors = require("cors");
const port = 8080

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'developer2',
    password : '',
    database : 'projectx'
  }
});

server.use(cors());
server.use(express.json())


// listare Todos
server.get('/todos',  async (req, res) => {
    const todos = await knex("todos").select("*");
    res.json(todos);
});

// Create todos

server.post("/todos", async (req, res) => {
  const name = req.body.name
 await knex("todos").insert({
    name: name,
    isCompleted: 0,

  });

  res.json();
})

//update todos

server.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const isCompleted = req.body.isCompleted;

  await knex("todos").where("id", "=", id).update({ isCompleted: isCompleted });  //retureneaza o promisiune
  res.json();
});


// delete todos

server.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  await knex("todos").where("id", "=", id).delete();
  res.json();
})


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
