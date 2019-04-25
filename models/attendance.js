const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const attendanceSchema = Schema({
    userid: {
        type: String
    },
    timestamp:{
        type: String,
        default:Date.now().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' })
    }
}, { timestamps: true })

module.exports = mongoose.model('Attendance', attendanceSchema);