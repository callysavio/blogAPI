import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/db.js";
import cors from "cors";
import colors from "colors";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comments.js";
import adminRoute from "./routes/admin.js";
import path from "path";
import logger from "./config/logger.js"; 
import rateLimit from "express-rate-limit"; 
import emailRoute from "./routes/user.js";
import { userSwaggerDocs, adminSwaggerDocs } from "./config/swagger.js";
import swaggerUi from 'swagger-ui-express';

// Load environment variables
dotenv.config();

const app = express();
const { PORT } = process.env;

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true, // Send rate limit headers
});

// Apply the rate limiter to all routes
app.use(limiter);

// Middleware for logging incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    headers: req.headers,
    body: req.body,
    query: req.query,
  });
  next();
});

// General middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Serve static files for uploaded images (if any)
app.use("/uploads", express.static(path.resolve("uploads")));

// Routes setup
app.use("/api/user", userRoutes);
app.use("/api/email", emailRoute)
app.use("/api", commentRoutes);
app.use("/api/admin", adminRoute);

// Serve the Swagger documentation for the user
app.use('/api/docs/user', swaggerUi.serve, swaggerUi.setup(userSwaggerDocs));


// Serve the Swagger documentation for the admin
app.use('/api/docs/admin', swaggerUi.serve, swaggerUi.setup(adminSwaggerDocs));


// Home Route
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to my blog web application server!",
  });
});

// Connect to the database and start server
dbConnection()
  .then(() => {
    logger.info(`Database connection successful`); // Log successful DB connection
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`); // Log server start
    });
  })
  .catch((error) => {
    logger.error("Failed to start server:", {
      message: error.message,
      stack: error.stack,
    }); // Log DB connection errors
  });
