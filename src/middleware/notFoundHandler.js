export function notFoundHandler(req, res, next) {
  const message = { error: 'Resource not found' };
  res
    .status(404)
    .render('error', {
      title: message.error,
      message: 'The page you are looking for does not exist.',
    });
}
