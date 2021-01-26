const yup = require('yup');
let loginSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().matches(/(^[0-9a-bA-Z]{3,})/).required()    
});

module.exports = loginSchema