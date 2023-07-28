const errorHandler = (err, req, res, next) => {
  res.status(500).send(err.message || "something went wrong");
};

module.exports = { errorHandler };
