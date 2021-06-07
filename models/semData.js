const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semSchema = new Schema({
    semNum : Number,
    subjectList:[{
        type: String
    }],
    sectionList:{
        type: Array,
        'default': ["A"]
      }

})
const SemData = mongoose.model('semData', semSchema)
module.exports = SemData;