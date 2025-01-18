const express = require('express');
const tokenUtil = require('../utils/tokenUtil');

exports.createEvents = async (req, res) => {
    try {
        const eventGroupArray = req.body;
        console.log(eventGroupArray)
        
        res.status(201).json("");
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};