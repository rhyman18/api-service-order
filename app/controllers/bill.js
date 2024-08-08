const responseJson = require("../utils/response");
const db = require("../models");
const { Op } = db.Sequelize;
const {
  order: Order,
  orderProduct: OrderProduct,
  productVariant: ProductVariant,
  productItem: ProductItem,
  productCategory: ProductCategory,
  table: Table,
} = db;

const BillController = {
  async findAll(req, res) {
    try {
      const getBills = await Order.findAll({
        include: [
          { model: Table },
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
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!getBills.length) {
        return responseJson(res, 400, "Failed: Bills is empty");
      }

      const detailBills = getBills.map((bill) => {
        const {
          id,
          customerName,
          paymentMethod,
          table: { name: tableName },
          orderProducts,
          createdAt,
        } = bill;

        const products = orderProducts.map((orderProduct) => ({
          category:
            orderProduct.productVariant.productItem.productCategory.name,
          name: orderProduct.productVariant.productItem.name,
          variant: orderProduct.productVariant.name,
          price: orderProduct.productVariant.price,
          quantity: orderProduct.quantity,
          total: orderProduct.productVariant.price * orderProduct.quantity,
        }));

        return {
          id,
          customerName,
          paymentMethod,
          tableName,
          products,
          grandTotal: products.reduce((sum, product) => sum + product.total, 0),
          date: createdAt,
        };
      });

      return responseJson(res, 200, "Success", detailBills);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async findOne(req, res) {
    try {
      const getBill = await Order.findOne({
        where: { id: req.params.id },
        include: [
          { model: Table },
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
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!getBill) {
        return responseJson(res, 400, "Failed: Bill is not found");
      }

      const {
        id,
        customerName,
        paymentMethod,
        table: { name: tableName },
        orderProducts,
        createdAt,
      } = getBill;

      const products = orderProducts.map((orderProduct) => ({
        category: orderProduct.productVariant.productItem.productCategory.name,
        name: orderProduct.productVariant.productItem.name,
        variant: orderProduct.productVariant.name,
        price: orderProduct.productVariant.price,
        quantity: orderProduct.quantity,
        total: orderProduct.productVariant.price * orderProduct.quantity,
      }));

      const detailBill = {
        id,
        customerName,
        paymentMethod,
        tableName,
        products,
        grandTotal: products.reduce((sum, product) => sum + product.total, 0),
        date: createdAt,
      };

      return responseJson(res, 200, "Success", detailBill);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },

  async findByDate(req, res) {
    try {
      const { start, end } = req.query;

      let dateFilter = {};
      if (start && end) {
        dateFilter = {
          createdAt: {
            [Op.between]: [new Date(start), new Date(end)],
          },
        };
      }

      const getBills = await Order.findAll({
        where: dateFilter,
        include: [
          { model: Table },
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
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!getBills.length) {
        return responseJson(res, 400, "Failed: Bills are empty");
      }

      const detailBills = getBills.map((bill) => {
        const {
          id,
          customerName,
          paymentMethod,
          table: { name: tableName },
          orderProducts,
          createdAt,
        } = bill;

        const products = orderProducts.map((orderProduct) => ({
          category:
            orderProduct.productVariant.productItem.productCategory.name,
          name: orderProduct.productVariant.productItem.name,
          variant: orderProduct.productVariant.name,
          price: orderProduct.productVariant.price,
          quantity: orderProduct.quantity,
          total: orderProduct.productVariant.price * orderProduct.quantity,
        }));

        return {
          id,
          customerName,
          paymentMethod,
          tableName,
          products,
          grandTotal: products.reduce((sum, product) => sum + product.total, 0),
          date: createdAt,
        };
      });

      return responseJson(res, 200, "Success", detailBills);
    } catch (error) {
      return responseJson(res, 400, `Failed: ${error.message}`);
    }
  },
};

module.exports = BillController;
