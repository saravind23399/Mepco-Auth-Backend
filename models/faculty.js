const mongoose = require(mongoose)
const Schema = mongoose.Schema;

const facultySchema = Schema({
    name : String,
    idString : String
})

module.exports = mongoose.model('Faculty',facultySchema);