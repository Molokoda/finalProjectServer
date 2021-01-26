const loginScheme = require('../schemes/loginSchema.ts') 
const regScheme = require('../schemes/regScheme.ts') 
const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    login = async(logUser) => {
        let validate = await loginScheme.isValid({ login: logUser.login, password: logUser.password})
        let result = '';
        if(validate){
            let users = await Users.find(function (err) {
                if (err) return console.error(err);
            })
            let user = users.find( (user) => user.login === logUser.login);
            result = await bcrypt.compare(logUser.password, user.password);
        }
        
        if(result){
            const id = user.id;
            const token = jwt.sign( {id}, 'secret');
            return ['success', token]
        }else{
           return 'login or password incorrect';
        }

        
    }

    reg = async(newUser) => {
        let validate = await regScheme.isValid( {login: newUser.login, password: newUser.password, name: newUser.name} ) 
        let answer ;
        if(validate){
            let users = await Users.find(function (err) {
                if (err) return console.error(err);
            })

            let sameUser = users.find( (element) => element.login === newUser.login);
            if(sameUser){
                answer = 'User with such login has already exist'
            }
            else{
                for(let key in newUser){
                    user[key] = newUser[key];
                }
    
                await bcrypt.hash(user.password, saltRounds).then( async (hash) => {
                    user.password = hash
                }) 
                await user.save();
                answer = user;
            }
            
        }
        else{
            answer = 'incorrect data'
        }
            
        return answer
    }
}

module.exports = new DBusersServices