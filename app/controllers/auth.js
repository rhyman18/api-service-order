const responseJson = require("../utils/response");
const { signUpSchema } = require("../utils/validate");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;

const AuthController = {
  async signUp(req, res) {
    try {
      const { error } = signUpSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return responseJson(res, 400, "Failed: Email already in use");
      }

      const signUp = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
      });

      const response = {
        id: signUp.id,
        name,
        email,
        password,
      };

      return responseJson(res, 200, "Success", response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = AuthController;
