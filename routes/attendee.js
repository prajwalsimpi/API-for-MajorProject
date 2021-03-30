//Importing the required Dependencies
const router = require('express').Router();
const userData = require('../models/userdata');
//Importing the Vefify Token middleware to verify token sent by the users 
const verify = require('../lib/verifyToken');

//Specifying the route, it will also use a middleware verify to authenticate
//users to this private route
router.get('/',verify,async (req,res) => {
    if(req.userPayload.userType === "attendee")
    {
        const userDetails = await userData.findOne({username: req.userPayload.username});
        res.send({"username": userDetails.username, "subjects" : userDetails.subjects});
    }
    else
    {
        res.send("Access Denied");
    }
})

//Exporting the routes
module.exports = router;