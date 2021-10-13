const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('ul.todo-list');

const getAllButton = document.querySelector('button.get-all');
const getActiveButton = document.querySelector('button.get-active');
const getCompletedButton = document.querySelector('button.get-completed');
const clearCompletedButton = document.querySelector('button.clear-completed');

let getPath = '/';
const renderList = async () => {
  const todos = await getTodos(getPath);
  todoList.innerHTML = '';
  todos.forEach(todo => {
      appendListItem(todo);
  });
}

const makeTodoFromHTMLItem = (htmlItem) => {
  return {
    id: htmlItem.dataset.id,
    task: htmlItem.innerText,
    isCompleted: htmlItem.classList.contains(COMPLETED),
  }
}

const updateTodo = async (htmlItem) => {
  const todo = makeTodoFromHTMLItem(htmlItem);
  todo.isCompleted = !todo.isCompleted;
  await putTodo(todo);
  renderList();
}

const removeTodo = async (htmlItem, e) => {
  e.preventDefault();
  const todo = makeTodoFromHTMLItem(htmlItem);
  await deleteTodo(todo);
  renderList();
}

const addListeners = async (item) => {
    item.addEventListener('click', async () => await updateTodo(item));
    item.addEventListener('contextmenu', async (e) => await removeTodo(item, e));
}

const appendListItem = (todo) => {
    const {id, task, isCompleted} = todo;
    const newItem = document.createElement('li');

    newItem.textContent = task;
    newItem.dataset.id = id;
    if (isCompleted) newItem.classList.add(COMPLETED);
    addListeners(newItem);

    todoList.appendChild(newItem);
    todoInput.value = '';
}

const setSelectedButton = (button, newGetPath) => {
  getAllButton.classList.remove(SELECTED);
  getActiveButton.classList.remove(SELECTED);
  getCompletedButton.classList.remove(SELECTED);

  button.classList.add(SELECTED);
  getPath = newGetPath;
  renderList();
}

todoInput.addEventListener('keydown', async (e) => {
    if (e.code === 'Enter' && todoInput.value) {
      const todo = {
        task: todoInput.value,
      }
      await postTodo(todo);
      renderList();
    }
});

clearCompletedButton.addEventListener('click', async () => {
  const todos = await clearCompletedTodos(COMPLETED);
  renderList(todos);
});

getAllButton.addEventListener('click', async (e) => setSelectedButton(e.target, '/'));
getActiveButton.addEventListener('click', async (e) => setSelectedButton(e.target, `/${ACTIVE}`));
getCompletedButton.addEventListener('click', async (e) => setSelectedButton(e.target, `/${COMPLETED}`));

renderList();