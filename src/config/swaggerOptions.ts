import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Learnig',
      description: 'Descrição da minha API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer {token}',
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  apis: ['src/**/*.ts'], 
};

export default swaggerOptions;
