const {readFile, writeFile} = require('fs').promises;

const FILE_NAME = './data/todos.json';
const readTodos = async () => JSON.parse(await readFile(FILE_NAME, 'utf-8'));
const writeTodos = async (todos) => await writeFile(FILE_NAME, JSON.stringify(todos), 'utf-8');

module.exports = {
  readTodos,
  writeTodos,
}