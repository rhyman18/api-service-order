require("dotenv").config();
const responseJson = require("../utils/response");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const verifyToken = async (req, res, callback) => {
  const tokenHeader = req.headers.authorization || false;
  if (!tokenHeader) {
    return responseJson(res, 500, "Unauthorized");
  } else if (tokenHeader.split(" ")[0] !== "Bearer") {
    return responseJson(
      res,
      500,
      "Incorrect token format, use Bearer as a prefix"
    );
  }

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_AUTH, async (error, decoded) => {
    if (error) {
      return responseJson(res, 500, `Failed: ${error}`);
    }

    req.loginId = decoded.id;

    const getUser = await User.findByPk(decoded.id);
    if (!getUser) {
      return responseJson(res, 500, "Failed: ID not found");
    }

    callback(req, res);
  });
};

module.exports = verifyToken;
