const Router = require('express').Router;
const authController = require('../controllers/auth-controller');

const router = new Router();

router.get('/', authController.test);

module.exports = router;
