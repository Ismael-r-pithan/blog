const { findAll, findById, save } = require('../db/mock-database-posts')
const PostModel = require('../models/post-model')
const { getConnection } = require('../db/database')

class PostController {
    
    async create(req, res) {

        const { content } = req.body;
        const post = new PostModel(
            req.session.user.id,
            new Date(),
            content
        );
        //save(post)

        const con = await getConnection();
        const sql = `insert into public.posts (added_by, created_at, content) values ($1, $2, $3);`

        const values = [post.added_by, post.created_at, post.content];
        const result = await con.query(sql, values);
            
        res.redirect('/posts');
    }

    async findAll(req, res) {
    //  const posts = findAll();
        const con = await getConnection();
        const sql = `select * from public.posts order by created_at desc limit 5;`
        const result = await con.query(sql)
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
            
        res.render('home', { posts, userid })
    }
    



}

module.exports = PostController;

//id = null, added_by,created_at, content