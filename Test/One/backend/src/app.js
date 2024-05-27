import dotenv from "dotenv";
dotenv.config({
  path: `./.env`,
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import requestIp from "request-ip";

const app = express();

morgan.token("custom-time", () => {
  const date = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const formattedDate = date.toISOString().replace("T", " ").slice(0, -1);
  return formattedDate;
});

const customLoggingFormat =
  ":custom-time - :method :url :status :response-time ms";

// cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// global middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan(customLoggingFormat));
app.use(requestIp.mw());

// routes import
import { errorHandler } from "./middlewares/error.middleware.js";
import healthCheckRouter from "./routes/healthCheck.route.js";
import empRouter from "./routes/emp.route.js";
import emp2Router from "./routes/emp2.route.js";
import dept2Router from "./routes/dept2.route.js";
// import x from "./routes/";

// routes declaration
app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/emp1", empRouter);
app.use("/api/v1/emp2", emp2Router);
app.use("/api/v1/dept2", dept2Router);

// app.use("/api/v1/", x);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// common error handling middleware
app.use(errorHandler);

export { app };
