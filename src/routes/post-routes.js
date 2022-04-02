const { Router } = require('express')
const PostController = require('../controllers/post-controller')
const { isAuth } = require('../config/security/auth-middlewares')

const routes = Router();

const postController = new PostController();

routes.post('/', isAuth, postController.create)

routes.post('/filterAutor', postController.filterAutor)

routes.get('/addpost', postController.addpost)

routes.get('/:page', postController.page)

routes.get('/', postController.findAll)



module.exports = routes;