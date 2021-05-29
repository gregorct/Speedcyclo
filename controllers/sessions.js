import Session from '../models/session.js'
import User from '../models/user.js'

export const addSession = async(req, res) => {
    try {       
        const newSession = new Session({
            username: req.body.username,
            date: new Date(),
            pulsaciones: req.body.pulsaciones,
            cadencias: req.body.cadencias,
            points: req.body.puntuacion

        })
        newSession.save()
        .then((session)=> {
            User.findOne({ username: req.body.username }).select('-_id -password')
            .then((user)=>{
                const newNumSesion = user.numSessions + 1
                const newTotaltime = user.totalTime + req.body.pulsaciones.length
                const newPoints = user.points + req.body.puntuacion
                const filter = { username: req.body.username }
                const update = { numSessions: newNumSesion, totalTime: newTotaltime, points: newPoints }
                User.findOneAndUpdate(filter, update).then(
                    res.status(201).json(newSession)
                )
            })
        })

        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteSession = async(req, res) => {
    try{    
        Session.findOneAndDelete({_id: req.body._id}).then(async (data)=>{
            const user = await User.findOne({ username: data.username }).select('-_id -password')
            const newNumSesion = user.numSessions - 1
            const newTotaltime = user.totalTime - data.pulsaciones.length
            const newPoints = user.points - data.points
            const filter = { username: data.username }
            const update = { numSessions: newNumSesion, totalTime: newTotaltime, points: newPoints }
            User.findOneAndUpdate(filter, update).then(()=>{
                res.status(200).json({status: "ok"})
            })
        })

        

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getSessions = async(req, res) => {
    try {
        await Session.find().where('username').equals(req.body.username).sort({date: -1}).select('-pulsaciones -cadencias')
        .then((sessions)=>{
            res.status(200).json(sessions)
        })
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getSession = async(req, res) => {
    try {
        Session.find().where('_id').equals(req.body._id)
        .then((session)=>{
            res.status(200).json(session)
        })
        
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getInfo = async(req, res) => {
    try {
        const sessions = await Session.find().where('username').equals(req.body.username)
        const numSessions = sessions.length
        let totalTime = 0
        let totalPoints = 0
        sessions.forEach(session => {
            totalTime = totalTime + session.pulsaciones.length
            totalPoints = totalPoints + session.points
        })
        
        res.status(200).json({
            numSessions: numSessions,
            totalTime: totalTime
        })
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}