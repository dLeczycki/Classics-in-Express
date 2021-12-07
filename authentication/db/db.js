const {readFile, writeFile} = require('fs').promises;
const {v4: generateId} = require('uuid');

class Db{
  constructor(){
    this.load();
  }

  load = async () => {
    this.data = await readFile('./data/data.json', 'utf8').then(data => JSON.parse(data));
  }

  save = async () =>{
    await writeFile('./data/data.json', 'utf8', JSON.stringify(this.data));
  }

  getOne = async (id) => {
    const user = this.data.findOne(user => user.id === id);
    return user;
  }

  getAll = async () => {
    return this.data;
  }

  add = async (user) => {
    const id = generateId();
    this.data.push({id, ...user});
    this.save();

    return id;
  }

  remove = async (id) => {
    this.data = this.data.filter(user => user.id !== id);
    this.save();
  }

  update = async (userToEdit) => {
    this.data = this.data.map(user => {
      if(user.id !== userToEdit.id) return user;
      return {...userToEdit}
    });
    this.save();
  }
}

const db = new Db();

module.exports = {
  db,
}