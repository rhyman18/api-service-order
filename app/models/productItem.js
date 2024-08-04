const { Model } = require("sequelize");

const productItem = (sequelize, DataTypes) => {
  class ProductItem extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  ProductItem.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "productItem",
      timestamps: false,
    }
  );

  return ProductItem;
};

module.exports = productItem;
