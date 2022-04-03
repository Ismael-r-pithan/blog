const { nanoid } = require("nanoid");
const UserModel = require("../models/user-model");
const { getConnection } = require('../config/database/database-config')
const bcrypt = require('bcrypt')
// const { save, findAll, findById } = require('../db/mock-database-users');

class UserController {

    async save(req, res) {
        const { name, email, password } = req.body;
        const bcryptPassword = bcrypt.hashSync(password, 10); 
        const id = nanoid(8);
        const createdAt = new Date();
        const user = new UserModel(id, name, email, bcryptPassword, createdAt);
        //save(user);


        const con = await getConnection();

        const isExists = `select * from public.users where email = $1;`
        const valuesExists = [ user.email ]
        const usersRows = await con.query(isExists, valuesExists);
        const userExists = usersRows.rows[0]; 
        if (userExists) {
            res.redirect('/cadastro.html')
        } else {

            const sql = `insert into public.users (id, name, email, password, created_at) values ($1, $2, $3, $4, $5);`
            const values = [user.id, user.name, user.email, user.password, user.createdAt];
            await con.query(sql, values);

            res.redirect('/login.html')
        }
    }

}

module.exports = UserController