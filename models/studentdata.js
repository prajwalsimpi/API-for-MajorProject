const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    sid: String,
    ssem: Number,
    ssection: String    //8D
})

const StudentData = mongoose.model('studentData', studentSchema)
module.exports = StudentData;