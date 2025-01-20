const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Event = require("./Event.js");
const EventParticipant = require("./EventParticipant.js");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isOrganizer: { type: DataTypes.BOOLEAN },
});

module.exports = User;
