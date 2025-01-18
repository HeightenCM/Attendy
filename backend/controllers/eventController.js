const express = require('express');
const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');
const Event = require('../models/Event')

exports.createEvents = async (req, res) => {
    try {
        const eventGroupArray = req.body;
        //console.log(eventGroupArray)
        const userData = await tokenUtil.authenticateToken(req)
        if(!userData || userData.role !== true) throw new Error('Not authorized')
        if(!Array.isArray(eventGroupArray)){
            throw new Error('Event group not an array');
        }
        const user = await User.findOne({
            where: {email: userData.email}
        })
        eventGroupArray.forEach(async (element) => {
            element.organizer = user.id
            element.participants = []
            await Event.create(element)
        });
        const events = await Event.findAll({
            where:{
                organizer: user.email
            }
        })
        res.status(201).json(events);
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};