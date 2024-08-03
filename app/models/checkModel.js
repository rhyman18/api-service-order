require("dotenv").config();
const Sequelize = require("sequelize");

const CheckModel = async () => {
  const status = {};

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DRIVER,
    }
  );

  try {
    await sequelize.authenticate();
    status.ok = true;
    status.response = "Connection has been established successfully.";
  } catch (error) {
    status.ok = false;
    status.response = `Unable to connect to the database: ${error}`;
  }

  return status;
};

module.exports = CheckModel;
