const { Router } = require('express')
const AuthController = require('./auth-controller')

const routes = Router()
const authController = new AuthController();

routes.post('/login', authController.auth)

routes.get('/logout', authController.logout)

module.exports = routes;