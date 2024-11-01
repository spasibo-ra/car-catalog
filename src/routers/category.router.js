import { Router } from 'express';
import {
  getCarByCategoryHandler,
  getCarBySubCategoryHandler,
  getCategoryBySlugHandler,
  getSubCategoryHandler,
  categoryListHandler,
  editCategoryViewHandler,
  editCategoryHandler,
} from '../controllers/category.controller.js';
import { imageUploadHandler } from '../middleware/ImageUploadHandler.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

class CategoryRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.#categoryRoutes();
    this.#editCategoryRoutes();
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

  #editCategoryRoutes() {
    this.router.get(`/:categorySlug/edit`, this.editCategoryView);
    this.router.post(`/:categorySlug/edit`, this.editCategory);
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

  get catgoriesList() {
    return [isAuthenticated, categoryListHandler];
  }

  get editCategoryView() {
    return [isAuthenticated, editCategoryViewHandler];
  }

  get editCategory() {
    return [imageUploadHandler('category'), editCategoryHandler]
  }
}

export default new CategoryRouter().router;
