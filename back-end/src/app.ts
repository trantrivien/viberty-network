import express, { Application } from "express";
import cors from "cors";
import { initDatabase } from "./config/database";
import { env } from "./config/env";
import routes from "./routes";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { logger } from "./utils/logger";
import cookieParser from "cookie-parser";


const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  // This is important for the cookie to be saved properly!!!
  cors({
    origin: `${process.env.NODE_ENV === "development" ? "http" : "https"}://${process.env.CLIENT_DOMAIN}`,
    credentials: true,
  }),
);
 

// Routes
app.use("/api", routes);

// Error handling
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    const pool = await initDatabase();
    app.set("dbPool", pool);
    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
