//Importing the required Dependencies
const router = require('express').Router();
const userData = require('../models/userdata');
const semData = require('../models/semData');
const studentData = require('../models/studentdata');
const sectionData = require('../models/sectionData');
//Importing the Vefify Token middleware to verify token sent by the users 
const verify = require('../lib/verifyToken');

//Specifying the route, it will also use a middleware verify to authenticate
//users to this private route
router.get('/',verify,async (req,res) => {
    if(req.userPayload.userType === "Attendee")
    {
        const userDetails = await studentData.findOne({sid: req.userPayload.id});
        const secDetails = await sectionData.findOne({section: userDetails.ssection})
        res.json(secDetails);
    }
    else
    {
        res.json({"message":"Invalid Access"});
    }
})

//Exporting the routes
module.exports = router;