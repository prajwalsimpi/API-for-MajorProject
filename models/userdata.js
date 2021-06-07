const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    password:  String,
    userType: String,
    displayname: { type:String, default: "Guest"}
});

const UserData = mongoose.model('userData', userSchema);
module.exports = UserData;