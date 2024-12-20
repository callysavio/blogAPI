import dotenv from 'dotenv';
dotenv.config(); 
const port = process.env.PORT

export const swaggerUserOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API Documentation",
      version: "1.0.0",
      description: "API documentation for user-related endpoints",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`, 
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier for the user",
            },
            firstName: {
              type: "string",
              description: "First name of the user",
            },
            email: {
              type: "string",
              description: "Email address of the user",
            },
            country: {
              type: "string",
              description: "Country of residence of the user",
            },
          },
          example: {
            id: "60c72b2f4f1a2567c8d78a6f", // Sample ID (MongoDB ObjectId format)
            name: "Jane Doe",
            email: "janedoe@example.com",
            role: "user", // Example role
          },
        },
  
        RegisterRequest: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: "First name of the user",
            },
            email: {
              type: "string",
              description: "Email address of the user",
            },
            country: {
              type: "string",
              description: "Country of residence of the user",
            },
            password: {
              type: "string",
              description: "Password for user registration",
            },
          },
        required: ["firstName", "email", "password", "country"],
        },
      },
    },
  },
  apis: ["./src/routes/user.js", "./src/routes/comments.js"], 
};

export default swaggerUserOptions;
