const users = [];

const findAll = () => { return users }

const save = (user) => { users.push(user) }

const findById = (id) => { return users.find(u => u.id == id) }


module.exports = { findAll, save, findById }

