const { findAll } = require('../../db/mock-database-users')
const { getConnection } = require('../../db/database')

class AuthController {

    async auth (req, res) {
        const { email, password } = req.body
        //const users = findAll()
        //const user = users.find(u => u.email === email && u.password === password)

        const con = await getConnection();
        const result = await con.query(`select * from public.users where email = $1 and password = $2`, [email, password]);

        const user = result.rows[0];
        console.log({user});

        if (user) {
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