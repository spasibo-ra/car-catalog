import { Router } from 'express';
import {
  getCarByCategoryHandler,
  getCarBySubCategoryHandler,
  getCategoryBySlugHandler,
  getSubCategoryHandler,
} from '../controllers/category.controller.js';

class CategoryRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.#categoryRoutes();
    this.#subCategoryRoutes();
  }

  #categoryRoutes() {
    this.router.get(`/list`, this.catgoriesList);
    this.router.get(`/:categorySlug`, this.getCategoryBySlug);
    this.router.get(
      `/:categorySlug/car/:carSlug`,
      this.getCarByCategory
    );
  }

  #subCategoryRoutes() {
    this.router.get(
      `/:categorySlug/sub/:subCategorySlug`,
      this.getSubCategory
    );
    this.router.get(
      `/:categorySlug/sub/:subCategorySlug/car/:carSlug`,
      this.getCarBySubCategory
    );
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
