const { Model } = require("sequelize");

const order = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.table);
      Order.hasMany(models.orderProduct);
    }
  }

  Order.init(
    {
      customerName: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
      paymentMethod: DataTypes.STRING,
      tableId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  return Order;
};

module.exports = order;
