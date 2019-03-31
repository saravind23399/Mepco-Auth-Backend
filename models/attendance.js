const mongoose = require(mongoose)
const Schema = mongoose.Schema;

const attendanceSchema = Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
    }
}, { timestamps: true })

module.exports = mongoose.model('Attendance', attendanceSchema);