const swaggerAutogen = require('swagger-autogen')();
const { outputFile, endpointsFiles } = require('./config');

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(({ success }) => {
    console.log(`Documentation genegation status: ${success}`);
  });
