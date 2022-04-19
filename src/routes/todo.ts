import { Request, Response } from 'express';

import { Todo } from '../models/todo.model';
import { persistToDisk, readFromDisk } from './file-storage';

const todos: Todo[] = [
  {
    id: 1,
    description: 'Faire les courses',
    memo: 'Pomme, poire, lessive',
    priority: 1,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    description: 'Envoyer le courrier',
    memo: 'Urgent',
    priority: 2,
    updatedAt: Date.now(),
  },
];

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
  res.status(404).json({ error: 'Not found' });
};

/*
* Create a todo.
*/
export const addTodo = async function(req: Request, res: Response) {
  await loadFromDisk();
  res.status(201).end();
  await saveTodosToFile();
};

/*
* Update a todo by its identifier.
*/
export const updateTodo = async function(req: Request, res: Response) {
  await loadFromDisk();
  res.status(404).json({ error: 'Not found' });
  await saveTodosToFile();
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

let loadedFromFile = false;
async function loadFromDisk() {
  if (!loadedFromFile) {
    todos.splice(0, todos.length); // empty list
    todos.push(...(await readFromDisk()));
    id = Math.max(...todos.map(todo => id));
    loadedFromFile = true;
  }
}
