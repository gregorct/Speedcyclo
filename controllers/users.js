/**
 * controller user.js
 */
import User from '../models/user.js'
import Session from '../models/session.js'
import jwt from 'jsonwebtoken'

export const userLogin = async (req, res) => {
    try{
        const user = await User.findOne(req.body).select('-_id -password')
        if(user != null) {
            
            const payload = {
                username: user.username
            }
            const token = jwt.sign(payload, process.env.SECRET,  {
                expiresIn: '1d'
            })
            res.status(200).json({
                user: user,
                token: token
            })
        } else {
            res.status(409).json(user)
        }
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {   
        const existsUser = await User.findOne().where('username').equals(req.body.username)
        if(!existsUser){
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                birthdate: req.body.birthdate,
                numSessions: 0,
                totalTime: 0,
                points: 0
            })
            await newUser.save()
            const user = await User.findOne(req.body).select('-_id -password')

            const payload = {
                username: user.username
            }
            const token = jwt.sign(payload, process.env.SECRET,  {
                expiresIn: '1d'
            })

            res.status(201).json({
                user: user,
                token: token
            })
        } else {
            res.status(409).json(null)
        }
    } catch (error) {
        res.status(409).json({message: error.message})        
    }
}

export const getUser = async (req, res) => {
    try{
        const user = await User.findOne(req.body).select('-_id -password')
        if(user != null) {
            res.status(200).json(user)
        } else {
            res.status(409).json(user)
        }
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}





export const findUser = async (req, res) => {
    try {
        const user = await User.findOne(req.body).select('username -_id')
        if(user != null) {
            res.status(200).json(user)
        } else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('username -_id')
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}




export const deleteUser = async(req, res) => {
    try{
        User.deleteOne().where('username').equals(req.body.username)
        .then(() => {
            Session.deleteMany().where('username').equals(req.body.username)
            .then(()=>{
                res.status(200).json({status: "ok"})
            })
            
        })
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}



