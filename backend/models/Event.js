const{DataTypes} = require('sequelize')
const sequelize = require('../database');
const State = require('../enums/State');

const Event = sequelize.define('Event',{
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.TEXT},
    state:{type:State}
})

module.exports = Event;