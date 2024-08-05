const { Model } = require("sequelize");

const productItem = (sequelize, DataTypes) => {
  class ProductItem extends Model {
    static associate(models) {
      ProductItem.belongsTo(models.productCategory);
      ProductItem.hasMany(models.productVariant);
    }
  }

  ProductItem.init(
    {
      name: DataTypes.STRING,
      productCategoryId: DataTypes.INTEGER,
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
