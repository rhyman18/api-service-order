const { Model } = require("sequelize");

const orderProduct = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      OrderProduct.belongsTo(models.productVariant);
    }
  }

  OrderProduct.init(
    {
      orderId: DataTypes.INTEGER,
      productVariantId: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orderProduct",
      timestamps: false,
    }
  );

  return OrderProduct;
};

module.exports = orderProduct;
