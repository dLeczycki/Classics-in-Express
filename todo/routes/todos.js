const express = require('express');
const {readTodos, writeTodos} = require('../utils/manage-todos');
const {v4: generateUniqueId} = require('uuid');

const todosRouter = express.Router();

todosRouter.get('/', async (req, res) => {
  try{
    const todos = await readTodos();

    res.json(todos);
  } catch(err){
    res.json([]);
  }
})

todosRouter.post('/', async (req, res) => {
  const newTodo = {
    id: generateUniqueId(),
    task: req.body.task,
    isCompleted: false,
  };

  try{
    const todos = await readTodos();
  
    todos.push(newTodo);
    await writeTodos(todos);
  
    res.json(todos);
  } catch(err){
    res.json([]);
  }
})

todosRouter.get('/active', async (req, res) => {
  try{
    const todos = await readTodos();
    const activeTodos = todos.filter(todo => todo.isCompleted === false);

    res.json(activeTodos);
  } catch(err){
    res.json([]);
  }
})

todosRouter.get('/completed', async (req, res) => {
  try{
    const todos = await readTodos();
    const completedTodos = todos.filter(todo => todo.isCompleted === true);

    res.json(completedTodos);
  } catch(err){
    res.json([]);
  }
})

todosRouter.delete('/completed', async (req, res) => {
  try{
    const todos = await readTodos();
    const activeTodos = todos.filter(todo => todo.isCompleted === false);
    await writeTodos(activeTodos);

    res.json(activeTodos);
  } catch(err){
    res.json([]);
  }

})


todosRouter.delete('/:id', async (req, res) => {
  const {id} = req.params;

  try{
    const todos = await readTodos();
    const todosAfterRemove = todos.filter(todo => todo.id !== id);
    await writeTodos(todosAfterRemove);

    res.json(todosAfterRemove);
  }catch(err) {
    res.json([]);
  }
})

todosRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedTodo = {id, ...req.body};

  try{
    const todos = await readTodos();
    const updatedTodos = todos.map((todo) => {
      if(todo.id !== id) return todo;
      return updatedTodo;
    })
    await writeTodos(updatedTodos);

    res.json(updatedTodos);
  }catch(err) {
    res.json([]);
  }
})

module.exports = {
  todosRouter,
}