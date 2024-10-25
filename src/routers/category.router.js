import { Router } from 'express';
import carRouter from './car.router.js';
import {
  homeHandler,
  getCarByCategoryHandler,
  getCarBySubCategoryHandler,
  getCategoryBySlugHandler,
  getSubCategoryHandler,
} from '../controllers/category.controller.js';

class CategoryRouter {
  #path = '/categories';
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.use('/', carRouter);
    this.router.get('/', this.home);
    this.router.get(`${this.#path}/:categorySlug`, this.getCategoryBySlug);
    this.router.get(
      `${this.#path}/:categorySlug/:carSlug`,
      this.getCarByCategory
    );
    this.router.get(
      `${this.#path}/:categorySlug/sub/:subCategorySlug`,
      this.getSubCategory
    );
    this.router.get(
      `${this.#path}/:categorySlug/sub/:subCategorySlug/:carSlug`,
      this.getCarBySubCategory
    );
  }

  get home() {
    return [homeHandler];
  }

  get getCarByCategory() {
    return [getCarByCategoryHandler];
  }

  get getCarBySubCategory() {
    return [getCarBySubCategoryHandler];
  }

  get getCategoryBySlug() {
    return [getCategoryBySlugHandler];
  }

  get getSubCategory() {
    return [getSubCategoryHandler];
  }
}

export default new CategoryRouter().router;
