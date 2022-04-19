import { promises as fs } from 'fs';
import path from 'path';
import { Todo } from '../models/todo.model';

const FILE_PATH = process.env.FILE_STORAGE || path.resolve(__dirname, '..', 'storage.json');

export async function persistToDisk(content: Todo[]) {
  await fs.writeFile(FILE_PATH, JSON.stringify(content));
}

export async function readFromDisk() {
  const contentString = await fs.readFile(FILE_PATH);

  try {
    const content = JSON.parse(contentString.toString());
    return content;
  } catch {
    return [];
  }
}