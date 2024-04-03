export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const messege = err.message || "Something went wrong!";
  res.status(status).json(messege);
};
