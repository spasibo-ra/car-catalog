const wrap = (fn) => async (req, res, next) =>
  await Promise.resolve(fn(req, res, next)).catch(next);

export default wrap;
