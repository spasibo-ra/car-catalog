export function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  console.error(error);

  res.status(status)
    .render('error', { title: 'Error', message });
};
