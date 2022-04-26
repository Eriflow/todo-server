import { Request, Response } from 'express';

import { Todo } from '../models/todo.model';
import { persistToDisk, readFromDisk } from './file-storage';

const todos: Todo[] = [];

let id = 3;

/*
* GET todos listing.
*/
export const findAll = async function(req: Request, res: Response) {
  await loadFromDisk();
  res.status(200).json(todos);
};

/*
* GET todo by identifier.
*/
export const findById = async function(req: Request, res: Response) {
  await loadFromDisk();
  res.status(200).json(todos.find(todo => id = todo.id));
};

/*
* Create a todo.
*/
export const addTodo = async function(req: Request, res: Response) {
  await loadFromDisk();
  let id = todos[todos.length-1].id
  // update this code to be able to add a todo
  todos.push(
    {
      id: id++,
      description: 'Faire la vaisselle',
      memo: '',
      priority: 2,
      updatedAt: Date.now(),
    }
  );
  res.status(201).end(JSON.stringify(todos[todos.length -1]));
  await saveTodosToFile();
};

/*
* Update a todo by its identifier.
*/
export const updateTodo = async function(req: Request, res: Response) {
  await loadFromDisk();
  await saveTodosToFile();
  res.status(404).json({ error: 'Not found' });
};

/*
* Delete a todo
*/
export const deleteTodo = async function(req: Request, res: Response) {
  await loadFromDisk();
  res.status(204).end();
  await saveTodosToFile();
  return;
};

function saveTodosToFile() {
  persistToDisk(todos);
}

async function loadFromDisk() {
  todos.splice(0, todos.length); // empty list
  todos.push(...(await readFromDisk()));
  id = Math.max(...todos.map(todo => todo.id));
}
