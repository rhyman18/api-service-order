const responseJson = require("../utils/response");
const { orderSchema } = require("../utils/validate");
const db = require("../models");
const sequelize = db.sequelize;
const {
  order: Order,
  orderProduct: OrderProduct,
  productVariant: ProductVariant,
  productItem: ProductItem,
  productCategory: ProductCategory,
  printerJob: PrinterJob,
  printer: Printer,
  table: Table,
} = db;

const OrderController = {
  async create(req, res) {
    const t = await sequelize.transaction();

    try {
      const { error } = orderSchema.validate(req.body);
      if (error) {
        await t.rollback();
        return responseJson(res, 400, `Failed: ${error.details[0].message}`);
      }

      const { customerName, paymentMethod, tableId, orderProducts } = req.body;

      const checkTable = await Table.findByPk(tableId);
      if (!checkTable) {
        await t.rollback();
        return responseJson(res, 404, "Failed: Table not found");
      }

      const createOrder = await Order.create(
        { customerName, paymentMethod, tableId },
        { transaction: t }
      );

      const orderProductEntries = orderProducts.map((product) => ({
        orderId: createOrder.id,
        productVariantId: product.id,
        quantity: product.qty,
      }));
      await OrderProduct.bulkCreate(orderProductEntries, { transaction: t });

      await t.commit();

      const orderDetails = await Order.findOne({
        where: { id: createOrder.id },
        include: [
          {
            model: OrderProduct,
            include: [
              {
                model: ProductVariant,
                include: [
                  {
                    model: ProductItem,
                    include: [
                      {
                        model: ProductCategory,
                        include: [
                          { model: PrinterJob, include: [{ model: Printer }] },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const orderProductDetail = orderDetails.orderProducts.map((product) => ({
        category: product.productVariant.productItem.productCategory.name,
        name: product.productVariant.productItem.name,
        variant: product.productVariant.name,
        price: product.productVariant.price,
        quantity: product.quantity,
        total: product.productVariant.price * product.quantity,
      }));

      const printersMap = new Map();
      orderDetails.orderProducts.forEach((orderProduct) => {
        orderProduct.productVariant.productItem.productCategory.printerJobs.forEach(
          (printerJob) => {
            const printerId = printerJob.printer.id;
            if (!printersMap.has(printerId)) {
              printersMap.set(printerId, {
                id: printerJob.printer.id,
                name: printerJob.printer.name,
              });
            }
          }
        );
      });
      const printers = Array.from(printersMap.values());

      const response = {
        customerName,
        paymentMethod,
        table: checkTable.name,
        products: orderProductDetail,
        printers,
        grandTotal: orderProductDetail.reduce(
          (sum, product) => sum + product.total,
          0
        ),
        date: createOrder.createdAt,
      };

      return responseJson(res, 200, "Success", response);
    } catch (error) {
      await t.rollback();
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },
};

module.exports = OrderController;
