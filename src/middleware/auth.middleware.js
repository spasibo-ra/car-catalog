export function isAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) return next();
  res.redirect('/auth/login');
}