const regYup = require('yup');
let regSchema = regYup.object().shape({
    login: regYup.string().required(),
    password: regYup.string().matches(/(^[0-9a-bA-Z]{3,})/).required(),
    name: regYup.string().required()    
});

module.exports = regSchema