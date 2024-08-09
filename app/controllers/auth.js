require("dotenv").config();
const responseJson = require("../utils/response");
const { signUpSchema, signInSchema } = require("../utils/validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

  async signIn(req, res) {
    try {
      const { error } = signInSchema.validate(req.body);
      if (error) {
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (!existingUser) {
        return responseJson(res, 400, "Failed: Email not found");
      }

      const verifyPassword = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!verifyPassword) {
        return responseJson(res, 400, "Failed: Wrong password");
      }

      const generateToken = jwt.sign(
        {
          id: existingUser.id,
        },
        process.env.SECRET_AUTH,
        {
          expiresIn: 86400,
        }
      );

      const response = {
        name: existingUser.name,
        email,
        accessToken: generateToken,
      };

      return responseJson(res, 200, "Success", response);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error}`);
    }
  },
};

module.exports = AuthController;
