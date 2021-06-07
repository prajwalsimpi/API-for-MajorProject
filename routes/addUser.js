//Importing the required Dependencies
const router = require('express').Router();
const userData = require('../models/userdata');
const semData = require('../models/semData');
const studentData = require('../models/studentdata')
const teacherData = require('../models/teacherdata')
const sectionData = require('../models/sectionData')
const bcrypt = require('bcrypt');

router.post('/host',async(req,res)=>{
    //HASH THE PASSWORDS BEFORE STORING ON THE DATABASE
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userSave = new userData({username: req.body.username, 
                                    password: hashedPassword,
                                    userType: "Host",
                                    displayname: req.body.displayname});
    const savedUser = await userSave.save()
    const teacherToData = {tid: savedUser._id,tseclist: req.body.seclist}
    const teacherSave = new teacherData(teacherToData)
    teacherSave.save()
        .then(result => res.json({"message":"Success"}))
        .catch((err) => {   res.json({"message":"Error"});
                            console.log(err);
        });
})

//Add attendee
router.post('/attendee',async(req,res)=>{
    //HASH THE PASSWORDS BEFORE STORING ON THE DATABASE
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userSave = new userData({username: req.body.username, 
                                    password: hashedPassword,
                                    userType: "Attendee",
                                    displayname: req.body.displayname});
    const savedUser = await userSave.save()
    const studentToData = {sid: savedUser._id,ssem: req.body.sem, ssection: req.body.section}
    const studentSave = new studentData(studentToData)
    studentSave.save()
        .then(result => res.json({"message":"Success"}))
        .catch((err) => {   res.json({"message":"Error"});
                            console.log(err);
        });
})
//Semester data with subjects

router.post('/semdata',async(req,res)=>{
    const semToData = { semNum: req.body.sem,
                        subjectList: req.body.subjectList,
                        sectionList: req.body.sectionList}
    const semSave = new semData(semToData)
    semSave.save()
        .then(result => res.json({"message":"Success"}))
        .catch((err) => {   res.json({"message":"Error"});
                            console.log(err);
        });
})

router.post('/section',(req,res)=>{
    const secSave = new sectionData(req.body)
    secSave.save()
        .then(result => res.json({"message":"Success"}))
        .catch((err) => {   res.json({"message":"Error"});
                            console.log(err);
        });
})
//Exporting the routes
module.exports = router;