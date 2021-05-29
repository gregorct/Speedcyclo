import express from 'express'
import {
    getUsers, createUser, 
    userLogin, findUser, 
    deleteUser, getUser
} from '../controllers/users.js'

import check from './check.js'

const router = express.Router()

// /api/users
router.post('/', getUsers)
router.post('/userlogin', userLogin)
router.post('/createuser', createUser)
router.post('/finduser', findUser)

router.post('/deleteuser', check, deleteUser)
router.post('/getuser', check, getUser)





export default router

