const { Router } = require('express');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const userRouter = new Router();

userRouter.use(authMiddleware);

userRouter.route('/')
// #swagger.description = 'Get all Users'
/* #swagger.responses[200] = {
    description: 'Array of all todos'
} */
    .get(userController.getUser);

userRouter.route('/:id/profile')
// #swagger.description = 'Update existing todo'
 /* #swagger.parameters['id'] = {
   description: 'Existing todo ID',
   type: 'string',
   required: true
 } */
    .get(userController.account);

userRouter.route('/:id')
    .get(userController.getUser)
    .delete(userController.removeUser);

module.exports = userRouter;
