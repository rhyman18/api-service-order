const { Model } = require("sequelize");

const table = (sequelize, DataTypes) => {
  class Table extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  Table.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "table",
      timestamps: false,
    }
  );

  return Table;
};

module.exports = table;
