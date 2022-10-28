const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const { body } = require('express-validator');
const routes = require('./routes');

const router = new Router();

router.get('/', authController.test);
router.get('/testjson', (req, res, next) => {
  res.json({ good: true });
});

// User and authorization
router.post(routes.registration,
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 24 }),
  authController.registration
);


module.exports = router;
