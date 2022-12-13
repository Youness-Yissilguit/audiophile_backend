require('dotenv').config();
const express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async function(req, res, next){
    
    let fisrtName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;
    if(!fisrtName || !lastName || !email || !password || !phone){
        return res.status(400).json({"message": "missing parameters !"})
    }else if(email != ''){
        try{
            const [userExist, _] = await Users.getUserByEmail(email);
            if(userExist.length >0)
            return res.status(403).json({"message": "email already exist !!"})
        }catch(error){
            console.log('error in register: ' + error);
            next(error);
        }
    }
    let hashPaswword = await bcrypt.hash(password, 8);
    let user = new Users(fisrtName, lastName, email, hashPaswword, phone);
    try {
        user = await user.register();
        res.status(201).json({'register': user, 'message': 'user created'});
    }catch(error){
        console.log('error in register: ' + error);
        next(error);
    }
}

const login = async function(req, res, next){
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(400).json({"message": "Missing parameters !"})
    }
    try{
        const [userExist, _] = await Users.getUserByEmail(email);
        if(!userExist.length){
            return res.status(403).json({"message": "Email or password incorrect!"})
        }
        const comparePassword = await bcrypt.compare(password, userExist[0]['password']);
        if(!comparePassword){
            console.log('not match');
            return res.status(400).json({'message': 'email or password incorrect!!'})
        }
        const token = jwt.sign({
            userId: userExist[0]['id'],
            email: userExist[0]['email']
        },
        process.env.SECRET_KEY,
        {expiresIn: '15m'}
        );

        res.send({'token': token,'message': 'login success :)'});
    }catch(error){
        console.log('error in login: ' + error);
        next(error);
    }
}
const isLogin = async function(req, res, next){
    try{
        let token = req.headers.authorization.split(' ')[0];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        console.log('user dataa: ' + req.userData.email)
        next();
    }catch(error){
        console.log('error in token' + error);
        res.status(400).send({'message': 'session expired !'});
    }
}

module.exports = {
    register,
    login,
    isLogin
}