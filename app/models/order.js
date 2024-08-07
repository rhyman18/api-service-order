const { Model } = require("sequelize");

const order = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // relational with other models
    }
  }

  Order.init(
    {
      tableId: DataTypes.INTEGER,
      customerName: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  return Order;
};

module.exports = order;
