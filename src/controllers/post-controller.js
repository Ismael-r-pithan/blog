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
        const sql =`select posts.added_by, posts.id, posts.created_at, posts.content, users.name as name
                    from posts
                    join users on users.id = posts.added_by 
                    order by created_at asc
                    limit 10 
                    offset ${page};` 
        const result = await con.query(sql);

        const posts = result.rows;
        let userid = req.session?.user ? true : false;

        const sqlcount = await con.query('select * from posts');
        const row = sqlcount.rows;
        res.render('posts', { posts, userid, row })
    }

    async filterAutor(req, res) {
        const { autor } = req.body;
        const sql = `select posts.added_by, posts.id, posts.created_at, posts.content, users.name  as name
                    from posts
                    join users on users.id = posts.added_by 
                    where name = '${autor}'
                    order by created_at asc;`
        const con = await getConnection();
        const result = await con.query(sql);
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
        const sqlcount = await con.query('select * from posts');
        const row = sqlcount.rows;
        res.render('posts', { posts, userid, row })
    }

    async filterDate(req, res) {
        const { dateFrom, dateTo } = req.body
        const sql = `select *
                    from public.posts
                    where cast(created_at as date) between 
                        cast($1 as date) 
                        and 
                        cast($2 as date)
                    order by created_at::date asc;`
        const values = [dateFrom, dateTo];
        console.log(`datefrom: ${dateFrom} dateTo: ${dateTo}`)
        const con = await getConnection();
        const result = await con.query(sql, values);
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
        const sqlcount = await con.query('select * from posts');
        const row = sqlcount.rows;
        res.render('posts', { posts, userid, row }) 
    }

    async details(req, res) {
        let id  = req.params.id;
        const { user } = req.session;
        const { usuario }= req.body;

        if (user.id != usuario) {
            res.send('Você não tem permissão para ver detalhes de um post que não é seu');
        } 
        const sql = `select posts.added_by, posts.id, posts.created_at, posts.content, users.name as name
                    from posts
                    join users on users.id = posts.added_by 
                    where public.posts.id = ${id}`;
        const con = await getConnection();
        const result = await con.query(sql);
        const posts = result.rows;
        let userid = req.session?.user ? true : false;
        res.render('detailspost', { posts, userid })
    }

    async delete(req, res) {
        let id = req.params.id;
        const sql = `delete from public.posts where public.posts.id = ${id};`;
        const con = await getConnection();
        await con.query(sql);
        res.redirect('/posts')
    }

    async attpost(req, res) {
        let userid = req.session?.user ? true : false;
        let postid = req.params.id;
        res.render('attpost', { userid, postid })
    }

    async update(req, res) {
        let postid = req.body.postid;
        const { content } = req.body

        const sql = `update public.posts set content = $1 where id = $2`;
        const values = [ content, postid ]
        const con = await getConnection();
        await con.query(sql, values);
        res.redirect('/posts')
    }

}

module.exports = PostController;
