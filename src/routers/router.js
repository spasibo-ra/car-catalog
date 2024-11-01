import { Router } from 'express';
import { responseHandler } from '../middleware/responseHandler.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { notFoundHandler } from '../middleware/notFoundHandler.js';
import categoryRouter from './category.router.js';
import authRouter from './auth.router.js';
import { authHandler } from '../middleware/authHandler.js';
import carRouter from './car.router.js';
import { Category } from '../models/category.model.js';
import Car from '../models/car.model.js';

class MainRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get('/', this.home)
    this.router.get('/healthcheck', this.healthCheckHandler);
    this.router.use(authHandler);
    this.router.use('/auth', authRouter);
    this.router.use('/categories', categoryRouter);
    this.router.use('/cars', carRouter);
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

  get home() {
    return async (req, res) => {
      const categories = await Category.find().populate('subcategories').lean();
      const cars = await Car.find().lean();
      res.render('home', { title: 'Car Catalog', categories, cars });
    }
  }
}

export default new MainRouter().router;
