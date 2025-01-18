const{DataTypes} = require('sequelize')
const sequelize = require('../database');
const State = require('../enums/State.js');
const User = require('./User.js');

const Event = sequelize.define('Event',{
    name:{type:DataTypes.STRING, allowNull:false},
    startTime:{type:DataTypes.TEXT},
    endTime:{type:DataTypes.TEXT},
    state:{type:DataTypes.TEXT},
    code:{type:DataTypes.TEXT},
    participants:{type:DataTypes.JSON}
})

Event.belongsTo(User, { as: 'organizedBy', foreignKey: 'organizer' });

module.exports = Event;