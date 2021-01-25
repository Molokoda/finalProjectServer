const expres = require('express');
const router = expres.Router();
const controller = require('../controllers/users.controller.ts');

router
    .post('/login', controller.login)
    .post('/reg', controller.reg)

module.exports = router