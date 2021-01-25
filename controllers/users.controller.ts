const services = require('../services/users.services.ts');

class UserController{
    service = services;

    login = async(req, res, next) => {
        res
            .send( await(this.service.login( req.body) ) )
    }

    reg = async(req, res, next) => {
        res
            .send( await(this.service.reg( req.body ) ) )
    }
}

module.exports = new UserController