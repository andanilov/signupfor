
require('dotenv').config();

class AuthController {
  async test (req, res, next) {
    try {
      console.log('!!!', process.env.ENVVAR);
      res.end(`<h1>SignUpFor App! (${process.env.ENVVAR})</h1>`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthController();
