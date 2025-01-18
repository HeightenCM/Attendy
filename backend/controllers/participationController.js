const express = require('express');
const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');
const Event = require('../models/Event');

exports.sendCode = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {code: req.body.code}
        })

        const userData = await tokenUtil.authenticateToken(req)
        if(!userData || userData.role !== false) throw new Error('Not authorized')

        const user = await User.findOne({
            where: {email: userData.email}
        })

        // if(){

        // }

        const updatedParticipants = event.participants || [];
        updatedParticipants.push({ email: user.email, name: user.name });

        event.setDataValue('participants', updatedParticipants);
        event.changed('participants', true);
        await event.save()
        res.status(200).json(event.name);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};