//Importing the required Dependencies
const router = require('express').Router();
const userData = require('../models/userdata');
const sectionData = require('../models/sectionData')
const semData = require('../models/semData');
const teacherData = require('../models/teacherdata');
//Importing the Vefify Token middleware to verify token sent by the users 
const verify = require('../lib/verifyToken');

//Specifying the route, it will also use a middleware verify to authenticate
//users to this private route
router.get('/',verify,async (req,res) => {
    if(req.userPayload.userType === "Host")
    {
        const userDetails = await teacherData.findOne({tid: req.userPayload.id});
        let aggregatedData = []
        for(let elem of userDetails.tseclist)
        {
            const secDetails = await sectionData.findOne({section: elem})
            aggregatedData.push(secDetails)
        }
        res.json(aggregatedData);
    }
    else
    {
        return res.send("Access Denied");
    }
});

router.post('/toggle',verify,
            async(req,res)=>{
                
    if(req.userPayload.userType === "Host")
    {
        const querystring = {section: req.body.section};
        const secDetails = await sectionData.findOne(querystring);
        for(let elem of secDetails.subjectList)
        {
            if(elem.subjectCode === req.body.subjectcode)
            elem.isActive = req.body.isactive;
        }
        sectionData.findOneAndUpdate(querystring, secDetails)
            .then(result => res.json({"message":"Success"}))
            .catch((err) => {   res.json({"message":"Error"});
                                console.log(err);
        });
    }
    else
    {
        return res.send("Access Denied");
    }
});

//Exporting the routes
module.exports = router;