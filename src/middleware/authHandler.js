export function authHandler(req, res, next) {
  res.locals.isAuthenticated = req?.session?.isAuthenticated || false;
  return next();
}
