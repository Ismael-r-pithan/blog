const { Router } = require('express')
const PostController = require('../controllers/post-controller')
const { isAuth } = require('../config/security/auth-middlewares')

const routes = Router();

const postController = new PostController();

routes.post('/', isAuth, postController.create)

routes.post('/filterAutor', postController.filterAutor)

routes.post('/filterDate', postController.filterDate)

routes.get('/addpost', isAuth, postController.addpost)

routes.get('/attpost/:id', isAuth, postController.attpost)

routes.post('/update', isAuth, postController.update)

routes.get('/page/:page', postController.page)

routes.get('/delete/:id', isAuth, postController.delete)

routes.post('/:id', isAuth, postController.details)

routes.get('/', postController.findAll)




module.exports = routes;