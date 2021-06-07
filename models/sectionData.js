const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    semNum : Number,
    section: String,
    subjectList:[{  subjectCode: String, 
                    subjectName: String, 
                    isActive:{  type:Boolean, 
                                default: false }
                }]
})

const SectionData = mongoose.model('sectionData', sectionSchema)
module.exports = SectionData;