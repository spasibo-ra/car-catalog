import { Router } from 'express';
import {
  loginHandler,
  loginViewHandler,
  logoutHandler,
} from '../controllers/auth.controller.js';

class AuthRouter {
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get(`/login`, this.loginView);
    this.router.get(`/logout`, this.logout);
    this.router.post(`/login`, this.login);
  }

  get login() {
    return [loginHandler];
  }

  get loginView() {
    return [loginViewHandler];
  }

  get logout() {
    return [logoutHandler];
  }
}

export default new AuthRouter().router;
