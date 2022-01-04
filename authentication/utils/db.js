const {readFile, writeFile} = require('fs').promises;

const usersPath = './data/users.json';

class Db{
  constructor(){
    this.load();
  }

  async load() {
    const fileData = await readFile(usersPath, 'utf8').then(data => JSON.parse(data));
    this.data = fileData;
  }

  async save(){
    await writeFile(usersPath, JSON.stringify(this.data), 'utf8');
  }

  async findOneByEmail(email) {
    const user = this.data.find(user => user.email === email);
    return user ?? null;
  }

  async findOneById(id) {
    const user = this.data.find(user => user.id === id);
    return user ?? null;
  }

  async findAll(){
    return this.data;
  }

  async insert(user){
    this.data.push(user);
    await this.save();

    return user.id;
  }
}

const db = new Db();

module.exports = {
  db,
}