const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});

const usersSchema = new Schema({
    login: String,
    password: String,
    name: String,
    friends: Array,
    chats: Array,
    avatar: String
})

const postSchema = new Schema({
    author: String,
    date: String,
    path: String,
    likes: Array,
    comments: Array,
})

const chatSchema = new Schema({
  users: Array,
  messages: Array
})

const Users = mongoose.model('Users', usersSchema);
const Posts = mongoose.model('Posts,', postSchema );
const Chats = mongoose.model('Chats', chatSchema);

module.exports.Users = Users
module.exports.Posts =  Posts
module.exports.Chats =  Chats