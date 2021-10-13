const request = async (path = '/', method = 'GET', body) => {
  const res = await fetch(`/todos${path}`, {
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json'},
  });
  const data = await res.json();

  return data;
}

const getTodos = async (path = '/') => request(path);
const postTodo = async (todo) => request('/', 'POST', todo);
const putTodo = async (todo) => request(`/${todo.id}`, 'PUT', todo);
const deleteTodo = async (todo) => request(`/${todo.id}`, 'DELETE');
const clearCompletedTodos = async () => request('/completed', 'DELETE');
