const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  birthday: { type: DataTypes.DATE },
});

module.exports = User;
