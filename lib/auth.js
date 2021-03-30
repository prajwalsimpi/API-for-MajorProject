//Importing the required Dependencies
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Importing the database models
const userData = require('../models/userdata');
//Importing the input validation fuctions 
const {registerValidation, loginValidation} = require('../lib/validation');

//Route for Rgisteration 
router.post('/register', async (req, res) =>{

    // Validation of input data by the user using the registerValidation
    //const { error } = registerValidation(req.body);
    //Sending the error response according to the error that was identified
    //in the input by the user.
    //if (error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE USER ALREADY EXISTS IN DATABASE
    const userExist = await userData.findOne({username: req.body.username});
    //if the user already exists then Respond that the user with the email already exists
    if(userExist) return res.status(400).send('User already exists');

    //HASH THE PASSWORDS BEFORE STORING ON THE DATABASE
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //CREATING USER OBJECT BEFORE STORING ON THE DATABASE
    const newUser = new userData({
        username: req.body.username,
        password: hashedPassword,
        userType: req.body.usertype,
        subjects: req.body.subjects
    });
    //STORING THE USER DETAILS ON THE DATABASE
    newUser.save()
        //If registeration is successfull send the response
        .then(result => res.send("Successfully Registered"))
        //If there not registered successfully respond as a Bad request
        .catch(err => {
            console.log(err);
            return res.status(400)
        })
});


//Route for Login
router.post('/login', async (req,res) => {

    // Validation of input data by the user using the loginValidation
    const { error } = loginValidation(req.body);
    //Sending the error response according to the error that was identified
    //in the input by the user.
    if (error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE USER EXISTS IN DATABASE
    const user = await userData.findOne({username: req.body.username});
    //If user doesn't exist then send a bad response message
    if(!user) return res.status(400).send('Username is wrong');

    //Check if password entered by the user is same as the password data in the database.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    //if password doesn't match respond as Invalid password
    if (!validPass) return res.status(400).send('Invalid Password')

    //If password is matched and the user exists in the database
    //Create and assign a token to the user
    const token = jwt.sign({username: user.username, userType: user.userType}, process.env.TOKEN_SECRET);
    //Attach the token to the header in the auth-token field
    res.header('auth-token', token).send(token);

});

//Export the routes
module.exports = router;
