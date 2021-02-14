const chatModels = require('../database/database.ts');
const chat = new chatModels.Chats;

class ChatsServices {

    create = async(data) => {
        chat.users = data.users;
        chat.avatar = '';
        chat._id.id = data.id;
        chat.isNew = true; 
        await chat.save();
        return JSON.stringify(chat);
    } 

    getMessages = async(chatId) => {
        let answer = await chatModels.Chats.findOne({_id: chatId}).exec();
        return JSON.stringify( {messages: answer.messages} )
    }

    addMessage = async(data) => {
        let chatforChange = await chatModels.Chats.findOne( {_id: data._id} ).exec();
        chatforChange.messages.push(data.message);
        await chatModels.Chats.findOneAndUpdate( {_id: data._id}, { messages: chatforChange.messages} ).exec();
        return JSON.stringify('success');
    }
}

module.exports = new ChatsServices;