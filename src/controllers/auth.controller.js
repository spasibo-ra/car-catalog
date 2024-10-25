import { verifyPassword } from '../utils/hash.js';
import wrap from '../utils/wrap.js';

async function login(req, res) {
  const { login, password } = req.body;
  const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (
    login === ADMIN_LOGIN &&
    (await verifyPassword(password, ADMIN_PASSWORD))
  ) {
    req.session.isAuthenticated = true;
    return res.redirect('/cars/list');
  }
  res.render('error', { error: 'Invalid username or password' });
}

async function loginView(req, res) {
  res.render('auth/login', { title: 'Admin Login' });
}

async function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
}

export const loginHandler = wrap(login);
export const loginViewHandler = wrap(loginView);
export const logoutHandler = wrap(logout);
