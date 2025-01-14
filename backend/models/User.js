const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Event = require('./Event');

const User = sequelize.define('User',{
    name:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, unique:true, allowNull:false},
    password:{type:DataTypes.STRING, allowNull:false},
    dateOfBirth:{type:DataTypes.DATE},
    isOrganizer:{type:DataTypes.BOOLEAN}
})

Event.hasMany(User)

module.exports = User;