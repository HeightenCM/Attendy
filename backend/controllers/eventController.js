const express = require('express');
const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');

exports.createEvents = async (req, res) => {
    try {
        const eventGroupArray = req.body;
        //console.log(eventGroupArray)
        const user = tokenUtil.authenticateToken()
        if(!user) throw new Error('Not authorized')
        if(!Array.isArray(eventGroupArray)){
            throw new Error('Event group not an array');
        }
        eventGroupArray.array.forEach(async element => {
            element.organizer = user.email;
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