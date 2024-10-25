export function responseHandler(req, res, next) {
  const { result } = res.locals;
  const status = res.locals?.status || 200;

  res.status(status);
  if (result) {
    res.json(result);
    return res.end();
  }
  return next();
};