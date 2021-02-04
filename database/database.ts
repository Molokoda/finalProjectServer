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
    friends: Array
})

const postSchema = new Schema({
    author: String,
    date: String,
    path: String
})

const Users = mongoose.model('Users', usersSchema);
const Posts = mongoose.model('Posts,', postSchema );

module.exports.Users = Users
module.exports.Posts =  Posts