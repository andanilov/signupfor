const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const callNextForIPs = require('../utils/callNextForIPs');
const { outputFile } = require('./config');

module.exports = (app) => {
  if (!fs.existsSync(outputFile)) return console.log(`API documentation file doesn't exist: ${outputFile}`);  
  const swaggerFile = JSON.parse(fs.readFileSync(outputFile));
  // Add rest request visualisation
  app.use(
    '/api-doc',
    callNextForIPs(['127.0.0.1']),
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
  );
};
