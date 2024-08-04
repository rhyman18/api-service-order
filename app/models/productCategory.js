const { Model } = require("sequelize");

const productCategory = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  ProductCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "productCategory",
      timestamps: false,
    }
  );

  return ProductCategory;
};

module.exports = productCategory;