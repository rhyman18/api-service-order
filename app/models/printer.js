const { Model } = require("sequelize");

const printer = (sequelize, DataTypes) => {
  class Printer extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  Printer.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "printer",
      timestamps: false,
    }
  );

  return Printer;
};

module.exports = printer;
