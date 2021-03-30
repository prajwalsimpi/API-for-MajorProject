const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    password:  String,
    userType: String,
    subjects:
        [{
            subjectId: String,
            subjectName: String,
            subjectSem: Number
        }]
});

const UserData = mongoose.model('userData', userSchema);

module.exports = UserData;