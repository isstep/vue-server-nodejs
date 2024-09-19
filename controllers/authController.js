const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function register(req, res){
    const {username, email, first_name, last_name, password, password_confirm} = req.body
  
    if(!username || !email || !password || !password_confirm || !first_name || !last_name) {
      return res.status(422).json({'message': 'Invalid fields'})
    }
  
    if(password !== password_confirm) return res.status(422).json({'message': 'Passwords do not match'})
  
    const userExists = await User.exists({email}).exec()
  
    if(userExists) return res.sendStatus(409)
  
    try {
      hashedPassword = await bcrypt.hash(password, 10)
  
      await User.create({email, username, password: hashedPassword, first_name, last_name})
  
      return res.sendStatus(201)
    } catch (error) {
      return res.status(400).json({message: "Could not register"})
    }
  } 

async function login(req, res) {
    res.sendStatus(200);
}

async function logout(req, res) {
    res.sendStatus(200);
}

async function refresh(req, res) {
    res.sendStatus(200);
}

async function user(req, res) {
    res.sendStatus(200);
}

module.exports = {register, login, logout, refresh, user}   