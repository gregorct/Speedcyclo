import express from 'express'
import jwt from 'jsonwebtoken'

const check = express.Router()

check.use((req, res, next)=>{
    let token = req.headers['x-access-token'] || req.headers['authorization']
    console.log(token)
    if(!token) {
        res.status(401).json({
            error: 'Es necesario un token de autenticación'
        })
        return
    }
    if(token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }
    if(token) {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                return res.status(401).json({
                    message: 'El token no es valido'
                })
            } else {
                if(req.body.username != decoded.username) {
                    return res.status(401).json({
                        message: 'El token del usuario no es válido'
                    })
                }
                req.decoded = decoded
                next()
            }     
        })
    }
})

export default check