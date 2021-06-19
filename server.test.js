var server = require('./server')
var fs = require('fs');
const json = {
    todo: [],
};

test('adds todo', () => {
    // resetTheDatabase
    const stringData = JSON.stringify(json);
    fs.writeFileSync('todo.json', stringData, 'utf8');

    //given
    var myTodo ={"text":"My Todo For Test","done":false,"id":"00000"};

    //when
    server.addTodo(myTodo);

    //then
    var fileData = fs.readFileSync('todo.json', 'utf-8');
    var todoFromDB = JSON.parse(fileData).todo[0];

    expect(todoFromDB.id).toBe(myTodo.id);
});