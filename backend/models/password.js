const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                 
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); 

module.exports = passwordSchema;
