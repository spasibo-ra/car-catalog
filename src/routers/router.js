import { Router } from 'express';
import { responseHandler } from '../middleware/responseHandler.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { notFoundHandler } from '../middleware/notFoundHandler.js';
import categoryRouter from './category.router.js';
import authRouter from './auth.router.js';
import { authHandler } from '../middleware/authHandler.js';

class MainRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get('/healthcheck', this.healthCheckHandler);
    this.router.use(authHandler);
    this.router.use('/', authRouter);
    this.router.use('/', categoryRouter);
    this.router.use(responseHandler);
    this.router.use(notFoundHandler);
    this.router.use(errorHandler);
  }

  get healthCheckHandler() {
    return (req, res, next) => {
      res.locals.result = {
        status: 'ok',
      };
      next();
    };
  }
}

export default new MainRouter().router;
