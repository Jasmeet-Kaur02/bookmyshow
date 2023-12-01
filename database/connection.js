const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

const connectDB = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Error while connecting to the database", err);
    });
};

module.exports = {
  connectDB,
  sequelize,
};
