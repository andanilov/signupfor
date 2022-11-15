require('dotenv').config();
const userRouter = require("./user-router");

const mainRouter = (app) => {
  app.use(process.env.API_ROUTE + '/users', userRouter);
}

module.exports = mainRouter;
