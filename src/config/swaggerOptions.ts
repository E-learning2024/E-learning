import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: 'E-Learnig',
      description: 'Descrição da minha API',
      version: '1.0.0',
    },
  },
  apis: ['src/**/*.ts'], 
};
export default swaggerOptions;
