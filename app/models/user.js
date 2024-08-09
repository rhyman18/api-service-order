const { Model } = require("sequelize");

const user = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
    }
  );

  return User;
};

module.exports = user;
