const { Router } = require('express')
const PostController = require('../controllers/post-controller')
const { isAuth } = require('../config/security/auth-middlewares')

const routes = Router();

const postController = new PostController();

routes.post('/', isAuth, postController.create)

routes.post('/filterAutor', postController.filterAutor)

routes.get('/addpost', postController.addpost)

routes.get('/attpost/:id', postController.attpost)

routes.post('/update', postController.update)

routes.get('/page/:page', postController.page)

routes.get('/delete/:id', postController.delete)

routes.get('/:id', postController.details)

routes.get('/', postController.findAll)




module.exports = routes;