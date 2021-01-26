const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});


const usersSchema = new Schema({
    login: String,
    password: String,
    name: String
})

const Users = mongoose.model('Users', usersSchema);
const user = new Users();

class DBusersServices{
    login = async(regUser) => {
        let users = await Users.find(function (err, users) {
            if (err) return console.error(err);
        })

        let result = users.find( (user) => user.login === regUser.login && user.password === regUser.password)
        if(result){
            const id = user.id;
            const token = jwt.sign( {id}, 'secret');
            return ['success', token]
        }else{
           return 'login or password incorrect';
        }

        
    }

    reg = async(newUser) => {

        for(let key in newUser){
            user[key] = newUser[key];
        }
        
        await user.save();
        return('success')
    }
}

module.exports = new DBusersServices