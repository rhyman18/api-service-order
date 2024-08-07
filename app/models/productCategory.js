const { Model } = require("sequelize");

const productCategory = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.hasMany(models.printerJob);
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
