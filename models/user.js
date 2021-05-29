import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    birthdate: Date,
    numSessions: Number,
    totalTime: Number,
    points: Number
})

const User = mongoose.model('User', userSchema)

export default User