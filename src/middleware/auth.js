const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  try {
    if (!token) return res.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403);
      req.user = user;
      next();
    });
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};
