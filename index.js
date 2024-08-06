require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const tagDocs = require("./app/utils/tags");

const checkRoute = require("./app/router/checkRoute");
const printerRoute = require("./app/router/printer");
const tableRoute = require("./app/router/table");
const productCategoryRoute = require("./app/router/productCategory");
const productItemRoute = require("./app/router/productItem");
const productVariantRoute = require("./app/router/productVariant");
const productRoute = require("./app/router/products");
const printerJobRoute = require("./app/router/printerJob");
const notFoundRoute = require("./app/router/notFound");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static("app/public"));

const title = process.env.TITLE;
const port = process.env.PORT;
const baseUrl = `${process.env.HOST}:${port}`;

const swaggerDefinition = {
  openapi: process.env.OPENAPI_VER,
  info: {
    title: title,
    version: process.env.VERSION,
    description: process.env.DESCRIPTION,
    contact: {
      name: process.env.AUTHOR_NAME,
      url: process.env.AUTHOR_SITE,
    },
  },
  tags: tagDocs,
  servers: [
    {
      url: baseUrl,
      description: "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./app/router/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/", checkRoute);
app.use("/api/", printerRoute);
app.use("/api/", tableRoute);
app.use("/api/", productCategoryRoute);
app.use("/api/", productItemRoute);
app.use("/api/", productVariantRoute);
app.use("/api/", productRoute);
app.use("/api/", printerJobRoute);
app.use("*", notFoundRoute);

app.listen(port, () => console.log(`${title} run on ${baseUrl}`));
