import * as http from 'node:http';
import dotenv from 'dotenv';
import { connect, disconnect } from 'mongoose';
import App from './src/app.js';

class Server {
  static #serverInstance;
  #port;
  #server;
  #app;

  constructor() {
    this.#runServer();
  }

  static bootstrap() {
    if (!this.#serverInstance) {
      this.#serverInstance = new Server();
      return this.#serverInstance;
    }
    return this.#serverInstance;
  }

  #runServer() {
    this.#setEnviroment();
    this.#port = this.#normalizePort(process.env.PORT || 3000);
    this.#app = new App(this.#port).express;
    this.#createServer();
    this.#conectToDatabase(process.env.MONGODB_URI);
  }

  #createServer() {
    this.#server = http.createServer(this.#app);
    this.#server.listen(this.#port);

    this.#server.on('listening', () => {
      const address = this.#server.address();

      const bind =
        typeof address === 'string'
          ? `pipe ${address}`
          : `port ${address.port}`;
      console.log(`The server is running on ${bind}`);
    });

    this.#server.on('error', (error) => {
      if (error.syscall !== 'listen') throw error;
      this.#closeDatabaseConnection();
      console.error(error);
      process.exit(1);
    });
  }

  #setEnviroment() {
    const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
    dotenv.config({ path: envFile });
  }

  #conectToDatabase(uri) {
    connect(uri, { serverSelectionTimeoutMS: 5000 })
      .then(() => console.log('Application connected to MongoDB'))
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      });
  }

  #closeDatabaseConnection() {
    disconnect()
      .then(() => console.log('Application close connection with MongoDB'))
      .catch((err) => console.error('Error closing database connection', err));
  }

  #normalizePort(val) {
    return typeof val === 'string' ? parseInt(val, 10) : val;
  }
}

export const server = Server.bootstrap();
