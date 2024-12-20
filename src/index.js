import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
dotenv.config(); 
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
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerAdminOptions from "./config/swaggerAdmin.js";
import swaggerUserOptions from "./config/swaggerUser.js"; 

// Extract environment variables
const { PORT } = process.env;

const app = express();

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

// Swagger documentation setup
const adminSwaggerDocs = swaggerJsdoc(swaggerAdminOptions);
app.use("/api/docs/admin", swaggerUi.serve, swaggerUi.setup(adminSwaggerDocs));

const userSwaggerDocs = swaggerJsdoc(swaggerUserOptions);
app.use("/api/docs/user", swaggerUi.serve, swaggerUi.setup(userSwaggerDocs));

// Routes setup
app.use("/api/user", userRoutes);
app.use("/api/email", emailRoute);
app.use("/api", commentRoutes);
app.use("/api/admin", adminRoute);

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
    logger.info(`Database connection successful`.green); // Log successful DB connection
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`.blue); // Log server start
      logger.info(`User API Docs: http://localhost:${PORT}/api/docs/user`.yellow);
      logger.info(`Admin API Docs: http://localhost:${PORT}/api/docs/admin`.yellow);
    });
  })
  .catch((error) => {
    logger.error("Failed to start server:", {
      message: error.message,
      stack: error.stack,
    }); // Log DB connection errors
  });
