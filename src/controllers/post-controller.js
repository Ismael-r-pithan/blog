const { findAll, findById, save } = require('../config/database/mock-database-posts')
const PostModel = require('../models/post-model')
const { getConnection } = require('../config/database/database-config')

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

    async addpost(req, res) {

        let userid = req.session?.user ? true : false;
        res.render('addpost', { userid })
    }

    async findAll(req, res) {
    //  const posts = findAll();
        const con = await getConnection();
        const sql = `select posts.created_at, posts.content, users.name as name
                    from posts
                    join users on users.id = posts.added_by 
                    order by created_at desc 
                    limit 5;`
        const result = await con.query(sql)
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
            
        res.render('home', { posts, userid })
    }
    
    async page(req, res) {
        let page = req.params.page;
        const con = await getConnection();
        const sql =`select posts.created_at, posts.content, users.name as name
                    from posts
                    join users on users.id = posts.added_by 
                    order by created_at asc
                    limit 10 
                    offset ${page};` 
        const result = await con.query(sql);
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
        res.render('posts', { posts, userid })
        // console.log(page)
        // res.send('Até aqui foi..')
    }

    async filterAutor(req, res) {
        const { autor } = req.body;
        const sql = `select posts.created_at, posts.content, users.name  as name
                    from posts
                    join users on users.id = posts.added_by 
                    where name = '${autor}'
                    order by created_at desc 
                    limit 5;`
        const con = await getConnection();
        const result = await con.query(sql);
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
        res.render('posts', { posts, userid })
    }



}

module.exports = PostController;
