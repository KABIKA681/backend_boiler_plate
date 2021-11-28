import "dotenv/config";
import path from "path";
import http, { Server } from "http";
import createError, { HttpError } from "http-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import {
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
} from "src/constants/httpStatusCodes";
import * as swaggerDocument from "docs/swagger.json";

const app: Express = express();
const server: Server = http.createServer(app);

console.log("-----------------------------");

app.use(cors());
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
app.get("/", (_, res) => res.render("index", { title: "challenge" }));
app.use("/api/v1", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((_: Request, __: Response, next) => {
  next(createError(HTTP_NOT_FOUND));
});

// error handler
app.use(
  (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || HTTP_SERVER_ERROR);
    const response = { message: err.message, error: err.status };
    res.send(response);
    next();
  }
);

export { app, server };
