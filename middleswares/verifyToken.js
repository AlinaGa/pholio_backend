const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      //the console indicates when email was created and expiry
      //   console.log(payload);
      req.user = payload;
      return next();
    }
    throw new Error();
  } catch (error) {
    res.status(403).send("Forbidden");
  }
};

module.exports = { verifyToken };
