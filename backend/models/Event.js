const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User.js");
const EventParticipant = require("./EventParticipant.js");

const Event = sequelize.define("Event", {
  name: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  repeat: { type: DataTypes.BOOLEAN, allowNull: false },
  repeatType: { type: DataTypes.STRING, allowNull: true },
  repeatCount: { type: DataTypes.INTEGER, allowNull: true },
  group: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Event;
