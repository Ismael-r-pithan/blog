const { Router } = require('express')
const UserController = require('../controllers/user-controller')
const { isAuth } = require('../config/security/auth-middlewares')

const routes = Router();

const userController = new UserController();

routes.post('/', userController.save)


//routes.get('/:id', isAuth, userController.details)
routes.get('/', userController.findAll)

module.exports = routes;