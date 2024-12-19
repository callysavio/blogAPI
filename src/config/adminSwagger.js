// admin-swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Admin API',
            version: '1.0.0',
            description: 'API for admin interactions'
        },
        servers: [
            {
                url: 'http://localhost:5000/api/admin'
            }
        ]
    },
    apis: ['./routes/adminRoutes.js'] // Replace with your admin route file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec, swaggerUi };