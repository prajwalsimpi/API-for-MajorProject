const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teacherSchema = new Schema({
    tid: String,
    tseclist: [{
        type: String   //[8D,7C]
    }]
})

const TeacherData = mongoose.model('teacherData', teacherSchema)
module.exports = TeacherData;