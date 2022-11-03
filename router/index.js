const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const { body } = require('express-validator');
const routes = require('./routes');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');

const router = new Router();

// Authorization
router.post(routes.registration,
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 24 }),
  authController.registration
);
router.post(routes.login,
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 24 }),
  authController.login
);
router.get(routes.refresh, authController.refresh);
router.post(routes.logout, authController.logout);
router.get(routes.activate, authController.activate);
router.post(routes.remember, authController.remember);
router.get(routes.remember + '/:link', authController.resetPassword);
router.post(routes.redact,
  authMiddleware,
  authController.redact
);

// User
router.get(routes.account,
  authMiddleware,
  userController.account
);

router.get(routes.users,
  authMiddleware,
  userController.getUser
);

module.exports = router;
