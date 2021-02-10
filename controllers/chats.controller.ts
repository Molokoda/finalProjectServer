const chatServices = require('../services/chats.services.ts')

class ChatsController{
    chatsService = chatServices;

    create = async(req, res, next) => {
        res
            .send( await( this.chatsService.create( req.body ) ) )
    }

    getMessages = async(req, res, next) => {
        res
            .send( await( this.chatsService.getMessages( req.query._id ) ) )
    }

    addMessage = async(req, res, next) => {
        res
            .send( await( this.chatsService.addMessage( req.body ) ) )
    }
}

module.exports = new ChatsController;