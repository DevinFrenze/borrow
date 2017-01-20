export function errorWrapper(fn) {
  return async function (req, res, next) {
    try { await fn(req, res, next) }
    catch (error) { next(error) }
  }
}

export function errorHandler(err, req, res, next) {
  // TODO catch errors here
  res.status(500).send(err.errors)
}
