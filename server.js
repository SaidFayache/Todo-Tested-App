const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

app.get('/todo', (req, res) => {
  fs.readFileAsync('todo.json', 'utf-8').then((data) => {
    const todo = JSON.parse(data).todo;
    res.send({
      body: todo,
    });
  })
})

exports.addTodo = function(todo)
{
    var fileData = fs.readFileSync('todo.json','utf8');
    const data = JSON.parse(fileData);
    const newTODO = todo;
    const date = new Date();
    newTODO.id = date.getTime().toString();
    data.todo.push(newTODO);
    const stringData = JSON.stringify(data);
    fs.writeFileSync('todo.json', stringData, 'utf-8');
};

app.post('/todo', (req, res) => {
    fs.readFileAsync('todo.json', 'utf-8').then((data) => {
        const parsed = JSON.parse(data);
        const newTODO = req.body;
        const date = new Date();
        newTODO.id = date.getTime().toString();
        parsed.todo.push(newTODO);
        const stringData = JSON.stringify(parsed);
        return fs.writeFileAsync('todo.json', stringData, 'utf-8');
    })
        .then(() => {
            res.send({ ok: true });
        })
});

app.patch('/todo/:id', (req, res) => {
  fs.readFileAsync('todo.json', 'utf-8').then((data) => {
    const parsed = JSON.parse(data);
    const { id } = req.params;
    parsed.todo.forEach((todo) => {
      if (todo.id === id) {
        todo.done = true;
      }
    });

    const stringData = JSON.stringify(parsed);
    return fs.writeFileAsync('todo.json', stringData, 'utf-8');
  })
  .then(() => {
    res.send({ ok: true });
  })
});
