
require('dotenv').config();

class AuthController {
  async test (req, res, next) {
    try {
      console.log('!!!', process.env.CLIENT_URL);
      res.end(`<h1>SignUpFor App! (${process.env.CLIENT_URL})</h1>`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new AuthController();
