const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Viberty Network',
      version: '1.0.0',
      description: 'Viberty Network API',
    },
    servers: [
      {
        url: 'http://localhost:8000/api', 
      },
    ],
  },
  apis: ['../routes/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
