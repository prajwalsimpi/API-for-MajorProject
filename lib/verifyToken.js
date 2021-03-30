//Importing the required Dependencies
const jwt = require('jsonwebtoken');


//Exporting the Function to verify the JSONwebToken that will be sent when a user logsin. 
//This will act as a middleware in different routes to authenticate the user
module.exports = function(req, res,next){
    //Fetching the auth-token field from the header of the request.
    //This header fiels will contain the user Token that will be used to authorise.
    const token = req.header('auth-token');
    //If there is no field in header named auth-token/ there is no data in field, 
    //then the access is denied to the user.
    if(!token) return res.status(401).send('Access Denied');
    //Verifying the token token obtained form the user using JWT Verify
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userPayload = verified;
        //If verified Perform subsequent functions
        next();
    }
    //If the token isn't successfully verified then send a bad request message to the user
    catch(err){
        res.status(400).send('Invalid Token');
    }
}