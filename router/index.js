const Router = require('express').Router;
const authController = require('../controllers/auth-controller');

const router = new Router();

router.get('/', authController.test);
router.get('/testjson', (req, res, next) => {
  res.json({ good: true });
});

module.exports = router;
