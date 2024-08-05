const { Model } = require("sequelize");

const productVariant = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  ProductVariant.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "productVariant",
      timestamps: false,
    }
  );

  return ProductVariant;
};

module.exports = productVariant;
