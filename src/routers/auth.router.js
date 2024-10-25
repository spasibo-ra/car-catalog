import { Router } from 'express';
import { loginHandler, loginViewHandler, logoutHandler } from '../controllers/auth.controller.js';

class AuthRouter {
  #path = '/auth'
  constructor() {
    this.router = Router();
    this.#init();
  }

  #init() {
    this.router.get(`${this.#path}/login`, this.loginView);
    this.router.get(`${this.#path}/logout`, this.logout);
    this.router.post(`${this.#path}/login`, this.login);
  }

  get login() {
    return [loginHandler]
  }

  get loginView() {
    return [loginViewHandler]
  }

  get logout() {
    return [logoutHandler]
  }
}

export default new AuthRouter().router;