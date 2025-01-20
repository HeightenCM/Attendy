const express = require('express');
const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');
const Event = require('../models/Event');
const userRepository = require('../repositories/userRepository')
const eventRepository = require('../repositories/eventRepository')

exports.sendCode = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: {code: req.body.code}
        })

        const userData = await tokenUtil.authenticateToken(req)
        if(!userData || userData.role !== false) throw new Error('Not authorized')
        
        if(!event) throw new Error('Code invalid')

        const user = await User.findOne({
            where: {email: userData.email}
        })

        if(event.participants.some(participant => participant.email === user.email)){
            res.status(200).json("Already attending")
            return;
        }

        const updatedParticipants = event.participants || [];

        const now = new Date();
        
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const formattedTime = `${day}.${month}.${year} ${hours}:${minutes}`;
        updatedParticipants.push({ email: user.email, name: user.name, time: formattedTime });

        event.setDataValue('participants', updatedParticipants);
        event.changed('participants', true);
        await event.save()
        res.status(200).json(event.name);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAttendanceList = async (req, res) => {
    try {
        const id = req.query.id
        if(!id) return res.status(400).json({ error: 'ID is required' })
        const event = await Event.findOne({
            where: {id: id}
        })
        res.status(200).json(event.participants);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.generateRandomCode = async (req, res) => {
    const id = req.query.id
    if(!id) return res.status(400).json({ error: 'ID is required' })

    const userData = await tokenUtil.authenticateToken(req)
    console.log(userData)
    if(!userData || userData.role !== true) throw new Error('Not authorized');
    const user = userRepository.getElementByEmail(userData.email)
    const events = await Event.findAll()
    
    try {
        let code;
        do{
            code = Math.random().toString(36).substr(2, 8).toUpperCase();
        } while(events.some(element => element.code == code));
        const event = await Event.findOne({
            where: {id: id}
        })
        event.code = code;
        await event.save()
        res.status(200).json(code);
    } catch (error) {
        console.error('Error when generating code: ', error)
        res.status(500).json({error: 'Internal server error'})
    }
}