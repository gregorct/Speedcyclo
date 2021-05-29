import express from 'express'
import {addSession, getSessions, getInfo, deleteSession, getSession} from '../controllers/sessions.js'
import check from './check.js'


const router = express.Router()

// /api/sessions
router.post('/delete', check, deleteSession)
router.post('/addsession', check, addSession)
router.post('/info', getInfo)
router.post('/', getSessions)
router.post('/session', getSession)

export default router