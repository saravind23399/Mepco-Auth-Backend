const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = Schema({
    username: String,
    password: String,
    department: String
})

module.exports = mongoose.model('Admin', adminSchema);