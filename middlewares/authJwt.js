const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (req, res, next) => {
  // console.log(req);
  let token = req.data?.accessToken ? req.data.accessToken : req.query?.accessToken ? req.query.accessToken : req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
