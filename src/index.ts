import { HttpError } from "http-errors";
import { app, server } from "./app";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require("debug")("challenge:server");

/**
 * Normalize a port into a number, string, or false.
 * @param {int} val The port number.
 * @returns {int} The port number.
 */
function normalizePort(val: number | string) {
  const port = Number(val);

  if (Number.isNaN(port)) {
    return val;
  }

  return port >= 0 ? port : false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 * Normalize a port into a number, string, or false.
 * @param {int} error The created error.
 * @returns {string} The error message.
 */
function onError(error: HttpError) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      process.stdout.write(`${bind} requires elevated privileges\n`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.stdout.write(`${bind} is already in use\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 * @returns {void}
 */
function onListening() {
  let bind = "";
  const addr = server.address();
  if (typeof addr === "string") {
    bind = `pipe ${addr}`;
  } else if (addr && typeof addr === "object" && addr.port) {
    bind = `port ${addr.port}`;
  }

  debug(`Listening on ${bind}`);
  if (process.env.APP_URL_BACKEND) {
    return process.stdout.write(
      `Server is running at: ${process.env.APP_URL_BACKEND}\n`
    );
  }
  return process.stdout.write(
    `Server is running at http://localhost:${port}\n`
  );
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
