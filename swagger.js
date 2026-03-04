const swaggerJSDoc = require('swagger-jsdoc');
require("dotenv").config();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Pretend API',
    version: '1.0.0',
    description: 'API documentation using swagger',
  },
  servers: [
    {
      url: process.env.URL, 
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  
};

const options = {
  swaggerDefinition,
  apis: ['./routes/api/*.js'], // Path to your route files containing JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;   