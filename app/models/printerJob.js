const { Model } = require("sequelize");

const printerJob = (sequelize, DataTypes) => {
  class PrinterJob extends Model {
    static associate(models) {
      PrinterJob.belongsTo(models.printer);
      PrinterJob.belongsTo(models.productCategory);
    }
  }

  PrinterJob.init(
    {
      printerId: DataTypes.INTEGER,
      productCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "printerJob",
      timestamps: false,
    }
  );

  return PrinterJob;
};

module.exports = printerJob;
