import { Router } from 'express';
import { addCarViewHandler, addCarHandler, editCarViewHandler, editCarHandler, listCarsHandler } from '../controllers/car.controller.js';
import { imageUploadHandler } from '../middleware/ImageUploadHandler.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

class CarRouter {
  #path = '/cars'
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get(`${this.#path}/list`, this.listCars)
    this.router.get(`${this.#path}/add`, this.addCarView);
    this.router.get(`${this.#path}/:carSlug/edit`, this.editCarView);
    this.router.post(`${this.#path}/add`, this.addCar);
    this.router.post(`${this.#path}/:carSlug/edit`, this.editCar);
  }

  get addCarView() {
    return [addCarViewHandler]
  }

  get addCar() {
    return [
      imageUploadHandler('cars'),
      addCarHandler
    ]
  }

  get editCarView() {
    return [
      editCarViewHandler
    ]
  }

  get editCar() {
    return [
      imageUploadHandler('cars'),
      editCarHandler
    ]
  }

  get listCars() {
    return [
      isAuthenticated,
      listCarsHandler
    ]
  }
}

export default new CarRouter().router;