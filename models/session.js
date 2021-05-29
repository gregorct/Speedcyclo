import mongoose from 'mongoose'

const sessionSchema = mongoose.Schema({
    username: String,
    date: Date,
    pulsaciones: [Number],
    cadencias: [Number],
    points: Number
})

const Session = mongoose.model('Session', sessionSchema)

export default Session