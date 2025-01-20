const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const EventParticipant = sequelize.define("EventParticipant", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = EventParticipant;
