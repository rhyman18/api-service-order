require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./app/router/routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

routes(app);

app.listen(port, () => console.log(`${title} run on ${baseUrl}`));
