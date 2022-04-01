const { findAll } = require('../../db/mock-database-users')
const { getConnection } = require('../../db/database')
const bcrypt = require('bcrypt')

class AuthController {

    async auth (req, res) {
        const { email, password } = req.body

        //const users = findAll()
        //const user = users.find(u => u.email === email && u.password === password)

        const con = await getConnection();
        const result = await con.query(`select * from public.users where email = $1`, [email]);
        const user = result.rows[0];
        const authUser = bcrypt.compareSync(password, user.password);

        if (authUser) {
            req.session.user = user;
            res.redirect('/')
        } else {
            res.redirect('/login.html')
        }
    }


    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/login.html');
    }
    
}

module.exports = AuthController