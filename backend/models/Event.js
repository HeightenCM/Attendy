const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const State = require("../enums/State.js");
const User = require("./User.js");

const Event = sequelize.define("Event", {
  name: { type: DataTypes.STRING, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  repeat: { type: DataTypes.BOOLEAN, allowNull: false },
  repeatType: { type: DataTypes.STRING, allowNull: true },
  repeatCount: { type: DataTypes.INTEGER, allowNull: true },
  group: { type: DataTypes.STRING, allowNull: false },
});

Event.belongsTo(User, { as: "organizedBy", foreignKey: "organizer" });

module.exports = Event;
