const{DataTypes} = require('sequelize')
const sequelize = require('../database');
const Event = require('./Event');

const EventGroup = sequelize.define('EventGroup',{
    name:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.TEXT},
})

EventGroup.hasMany(Event)

module.exports = EventGroup;