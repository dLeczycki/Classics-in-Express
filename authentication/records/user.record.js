const {v4: generateId} = require('uuid');
const {compare, genSalt, hash} = require('bcrypt');

const {db} = require('../utils/db');
const {ValidationError} = require('../utils/errors');

class UserRecord {
  constructor(obj){
    if(!obj.email || obj.email.indexOf('@') === -1) throw new ValidationError('Invalid email address');
    if(!obj.password || obj.password.length < 6) throw new ValidationError('Password must be at least 6 characters long');

    this.id = obj.id ?? generateId();
    this.email = obj.email;
    this.password = obj.password;
  }

  static async findOneByEmail(email) {
    return await db.findOneByEmail(email);
  }

  static async findOneById(id) {
    return await db.findOneById(id);
  }

  static async findAll() {
    return await db.findAll();
  }

  async insert() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    return await db.insert(this);
  }

  static async login(email, password) {
    const user = await UserRecord.findOneByEmail(email);
    if(user){
      const auth = compare(password, user.password);
      if(auth) return user;
    }
    return null;
  }
}

module.exports = {
  UserRecord,
}