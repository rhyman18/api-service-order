const checkRoute = require("./checkRoute");
const authRoute = require("./auth");
const printerRoute = require("./printer");
const tableRoute = require("./table");
const productCategoryRoute = require("./productCategory");
const productItemRoute = require("./productItem");
const productVariantRoute = require("./productVariant");
const productRoute = require("./products");
const printerJobRoute = require("./printerJob");
const orderRoute = require("./order");
const billRoute = require("./bill");
const notFoundRoute = require("./notFound");

module.exports = {
  checkRoute,
  authRoute,
  printerRoute,
  tableRoute,
  productCategoryRoute,
  productItemRoute,
  productVariantRoute,
  productRoute,
  printerJobRoute,
  orderRoute,
  billRoute,
  notFoundRoute,
};
