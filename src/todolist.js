const cors = require('cors');
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');

const todo = require('./routes/todo');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
}));
app.use(express.json());

app.get('/api/todos', todo.findAll);
app.get('/api/todos/:id', todo.findById);
app.post('/api/todos', todo.addTodo);

app.put('/api/todos/:id', todo.updateTodo);
app.delete('/api/todos/:id', todo.deleteTodo);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
