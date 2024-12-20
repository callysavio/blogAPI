import dotenv from 'dotenv';
dotenv.config(); 
const port = process.env.PORT


const swaggerAdminOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API Documentation",
      version: "1.0.0",
      description: "API documentation for admin-related endpoints",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`, // Ensure the server URL is correct
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Admin: {
          type: "object",
          properties: {
            id: { type: "string", description: "Unique identifier for the admin" },
            name: { type: "string", description: "Name of the admin" },
            email: { type: "string", description: "Email address of the admin" },
            role: { type: "string", enum: ["super-admin", "admin"], description: "Role of the admin" },
          },
          example: {
            id: "60c72b2f4f1a2567c8d78a6f",
            name: "John Doe",
            email: "admin@example.com",
            role: "super-admin",
          },
        },
      },
    },
  },
  apis: ["./src/routes/admin.js"], // Include admin route files
};

export default swaggerAdminOptions;


