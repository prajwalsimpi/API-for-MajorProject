//Importing the required Dependencies
const Joi = require('@hapi/joi');

//Register Validation 
//data Parameter is req.body
const registerValidation = (data) =>{
    //Defining the schema for Validating the Input from user using Joi
    const schema = {
    username: Joi.string().min(6).required(),
    usertype: Joi.string().min(4).required(),
    password: Joi.string().required()
    };
    //Returning the error object if there are any errors found during Validation 
    return Joi.validate(data,schema);
};
//Login Validation 
//data Parameter is req.body
const loginValidation = (data) => {
    //Defining the schema for Validating the Input from user using Joi
    const schema = {
        username: Joi.string().min(6).required(),
        password: Joi.string().required()
        };
        //Returning the error object if there are any errors found during Validation
        return Joi.validate(data,schema);
};

//Exporting Login Validation and Register Validation functions
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;