const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const PORT = 3000;

const options = {
  info: {
    title: 'TODO APP API',
    description: '투두앱을 위한 API SWAGGER.',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
  schemes: ['http'],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./index.ts'];
swaggerAutogen(outputFile, endpointsFiles, options);
