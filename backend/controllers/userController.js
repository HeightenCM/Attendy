const express = require('express');
const User = require('../models/User');
const router = express.Router();

exports.test = async (req, res) => {
    try {
        console.log('User routes registered on /api/user');
        res.send('test');
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.signup = async (req, res) => {
    try{
        const userDto = req.body;
        console.log(userDto);
        const newUser = await User.create(userDto)

        //res.status(201).json(newUser) //For debugging only
        res.status(201).json("token")
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json('Internal server error');
    }
}