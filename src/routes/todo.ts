import { Request, Response } from 'express';
import { Todo } from '../models/todo.model';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Faire les courses',
    description: 'Pomme, poire, lessive',
    priority: 2,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    title: 'Envoyer le courrier',
    description: 'Urgent',
    priority: 3,
    updatedAt: Date.now(),
  },
  {
    id: 3,
    title: 'Lire le journal',
    description: 'Smashing magazine, sidebar.io, Hacker News',
    priority: 1,
    updatedAt: Date.now(),
  },
];

let id = 4;

/*
* GET todos listing.
*/
export const findAll = function(req: Request, res: Response) {
  res.status(200).json(todos);
};

/*
* GET todo by identifier.
*/
export const findById = function(req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
};

/*
* Create a todo.
*/
export const addTodo = function(req: Request, res: Response) {
  res.status(201).end();
};

/*
* Update a todo by its identifier.
*/
export const updateTodo = function(req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
};

/*
* Delete a todo
*/
export const deleteTodo = function(req: Request, res: Response) {
  res.status(204).end();
  return;
};
