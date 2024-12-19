import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

/** Resolve __dirname equivalent in ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Swagger options for the user API documentation.
 */
const userSwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API Documentation',
      version: '1.0.0',
      description: 'API documentation for the user endpoints',
      contact: {
        name: 'Callistus Anwara',
        email: 'callistusanwara@gmail.com',
      },
    },
    tags: [
      { name: 'User', description: 'User related API' }
    ],
  },
  // Correct path to the user route file
  apis: [path.join(__dirname, '../routes/user.js')],
};

/**
 * Swagger options for the admin API documentation.
 */
const adminSwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Admin API Documentation',
      version: '1.0.0',
      description: 'API documentation for the admin endpoints',
      contact: {
        name: 'Callistus Anwara',
        email: 'callistus@gmail.com',
      },
    },
    tags: [
      { name: 'Admin', description: 'Admin related API' }
    ],
  },
  // Correct path to the admin route file
  apis: [path.join(__dirname, '../routes/admin.js')],
};

// Initialize swagger-jsdoc for user and admin documentation
const userSwaggerDocs = swaggerJSDoc(userSwaggerOptions);
const adminSwaggerDocs = swaggerJSDoc(adminSwaggerOptions);

export { userSwaggerDocs, adminSwaggerDocs };
