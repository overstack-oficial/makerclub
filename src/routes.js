const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const authMiddleware = require('./app/middlewares/authenticated');

const UserController = require('./app/controllers/UserController');
const LoginController = require('./app/controllers/LoginController');
const ServiceController = require('./app/controllers/ServiceController');
const FavoriteController = require('./app/controllers/FavoriteController');

const routes = new Router();

routes.post('/user', UserController.store);

routes.post('/login', LoginController.store);

routes.get('/service/:id', authMiddleware, ServiceController.show);
routes.get('/service', authMiddleware, ServiceController.index);
routes.post('/service', authMiddleware, ServiceController.store);
routes.put('/service', authMiddleware, ServiceController.update);
routes.delete('/service/:id', authMiddleware, ServiceController.delete);

routes.put('/favorite', authMiddleware, FavoriteController.update);
routes.post('/favorite', authMiddleware, FavoriteController.store);
routes.get('/favorite', authMiddleware, FavoriteController.index);

routes.get('/user', authMiddleware, UserController.index);
routes.post('/user', multer(multerConfig).array("file"), UserController.store);

module.exports = routes;