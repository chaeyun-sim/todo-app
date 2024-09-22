import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TODO APP API',
      version: '1.0.0',
      description: '투두앱을 위한 API SWAGGER.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}`,
      },
    ],
  },
  apis: ['./src/swagger/*.swagger.ts', './src/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);
