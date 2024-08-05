const { Model } = require("sequelize");

const productVariant = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    static associate(models) {
      ProductVariant.belongsTo(models.productItem);
    }
  }

  ProductVariant.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      productItemId: DataTypes.INTEGER,
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
