const express = require('express');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const profil = async function(req, res, next){
   const id = req.userData.userId;
    try {
        const [user, _] = await Users.getUserById(id);
        console.log('profil: ' + user)
        res.status(201).json({'userinfo': user});
    }catch(error){
        console.log('error in register: ' + error);
        res.status(400).json({'message': 'error'});
    }
}


module.exports = {
    profil
}