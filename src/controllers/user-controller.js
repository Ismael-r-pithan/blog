const { nanoid } = require("nanoid");
const UserModel = require("../models/user-model");
const { save, findAll, findById } = require('../db/mock-database-users');
const { getConnection } = require('../db/database')

class UserController {

    async save(req, res) {
        const { name, email, password } = req.body;
        const id = nanoid(8);
        const createdAt = new Date();
        const user = new UserModel(id, name, email, password, createdAt);
        save(user);


        const con = await getConnection();

        const sql = `insert into public.users (id, name, email, password, created_at) values ($1, $2, $3, $4, $5);`
        const values = [user.id, user.name, user.email, user.password, user.createdAt];

        await con.query(sql, values);

        res.redirect('/login.html')
    }

    async findAll(req, res) {
        const users = findAll();
        console.log(users);
        res.send(users);
    }

    async details(req, res) {
        const { id } = req.params;
        const user = findById(id);
        console.log(user);
        res.render('home')

    }

}

module.exports = UserController