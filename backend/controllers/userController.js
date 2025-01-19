const express = require('express');
const User = require('../models/User');
const router = express.Router();
const tokenUtil = require('../utils/tokenUtil')
const userRepository = require('../repositories/userRepository')

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
        email = userDto.email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Account already exists' });
        }

        const newUser = await User.create(userDto)
        //res.status(201).json(newUser) //For debugging only
        const token = await tokenUtil.generateJWT(newUser.email, newUser.isOrganizer)
        res.status(201).json(token)
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json('Internal server error');
    }
}

exports.login = async (req, res) => {
    try{
        const userDto = req.body;
        const email = userDto.email;
        console.log(userDto);
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (userDto.password !== user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //res.status(201).json(user) //For debugging only
        const token = await tokenUtil.generateJWT(user.email, user.isOrganizer)
        res.status(201).json(token)
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json('Internal server error');
    }
}

exports.getName = async (req, res) => {
    try {
        const userData = await tokenUtil.authenticateToken(req)
        if(!userData || userData.role !== true) throw new Error('Not authorized');
        console.log(userData)
        user = await userRepository.getElementByEmail(userData.email)
        res.status(200).json(user.name)
    } catch (error) {
        console.error('Error in test route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}