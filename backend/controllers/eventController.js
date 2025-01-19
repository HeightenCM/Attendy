const express = require('express');
const tokenUtil = require('../utils/tokenUtil');
const User = require('../models/User');
const Event = require('../models/Event');
const eventRepository = require('../repositories/eventRepository')

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
        const events = await eventRepository.getEventsByOrganizer(user.id)

        res.status(201).json(events);
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const userData = await tokenUtil.authenticateToken(req)
        if(!userData || userData.role !== true) throw new Error('Not authorized')
        const user = await User.findOne({
            where: {email: userData.email}
        })
        
        const events = await eventRepository.getEventsByOrganizer(user.id)
        
        res.status(201).json(events);
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteEvent = async (req, res) => {
    const id = req.query.id
    if(!id) return res.status(400).json({ error: 'ID is required' })

    const userData = await tokenUtil.authenticateToken(req)
    if(!userData || userData.role !== true) throw new Error('Not authorized')
    const user = await User.findOne({
        where: {email: userData.email}
    })
    const result = await Event.destroy({
        where: { organizer: user.id, id: id }
    })
    if (result) {
        res.status(200).json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }

}