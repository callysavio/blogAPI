import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

// Define log directory
const logDir = path.join("logs");

// Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // File transport with daily rotation
    new DailyRotateFile({
      filename: `${logDir}/%DATE%-api.log`, // Log file name format
      datePattern: "YYYY-MM-DD", // Rotate daily
      zippedArchive: true, // Compress old logs
      maxSize: "20m", // Max file size
      maxFiles: "14d", // Retain logs for 14 days
    }),
  ],
});

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new DailyRotateFile({
    filename: `${logDir}/%DATE%-exceptions.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  })
);

logger.rejections.handle(
  new DailyRotateFile({
    filename: `${logDir}/%DATE%-rejections.log`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  })
);

export default logger;
