class ValidationError extends Error {};

const handleError = (err, req, res, next) => {
  console.log(err);

  res
    .status(err instanceof ValidationError ? 400 : 500)
    .render('error', { 
      message: err instanceof ValidationError ? err.message : 'Sorry, try again later.'
    })
}



module.exports = {
  ValidationError,
  handleError,
}