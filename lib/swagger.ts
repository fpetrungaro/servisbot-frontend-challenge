import swaggerJsDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ServisBOT API docs',
    version: '1.0.0',
    description: 'API Documentation for ServiceBOT services, including bots, workers and logs',
  },
  servers: [
    {
      url: 'http://localhost:3000', // We could use ENV variables to point to another env
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./pages/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsDoc(options);

