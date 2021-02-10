const loginScheme = require('../schemes/loginSchema.ts') 
const regScheme = require('../schemes/regScheme.ts') 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const models = require('../database/database.ts')

const user = new models.Users();

class DBusersServices{
    login = async(logUser) => {
       
        let user;
        let validate = await loginScheme.isValid({ login: logUser.login, password: logUser.password})
        let result = '';
        if(validate){
            let users = await models.Users.find(function (err) {
                if (err) return console.error(err);
            })
            user = users.find( (user) => user.login === logUser.login);
            result = await bcrypt.compare(logUser.password, user.password);
        }
        
        if(result){
            let answer = {login: '', friends: [], chats: [], avatar: ''};
            for( let field in answer ){
                if( user[field] ){
                    answer[field] = user[field];
                }
            }
            const id = user.id;
            const token = jwt.sign( {id}, 'secret');
            return  JSON.stringify([answer, token]);
        }else{
            return JSON.stringify('login or password wrong');
        }

        
    }

    reg = async(newUser) => {
        let validate = await regScheme.isValid( {login: newUser.login, password: newUser.password, name: newUser.name} ) 
        let answer = '';
        if(validate){
            let users = await models.Users.find(function (err) {
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
                user.isNew = true; 
                await user.save();
                answer = 'Success. Now you can Log In :)';
            }
            
        }
        else{
            answer = 'incorrect data'
        }
            
        return JSON.stringify(answer)
    }

    answer = () => {
        return 'answer'
    }

    getAll = async() => {
        let users = await models.Users.find(function (err) {
            if (err) return console.error(err);
        })

        return JSON.stringify(users);
    }

    changeFriends = async(data) => {
        let user = await models.Users.findOne( {login: data.login}  ).exec();
        if(user.friends){
            let isFriend = user.friends.find( (friend) => friend === data.friend);
            if(isFriend){
                let isDeleteFriendFind = false;
                for(let i = 0; i < user.friends.length - 1; i++){
                    if( user.friends[i] === data.friend ||  isDeleteFriendFind){
                        user.friends[i] = user.friends[ i + 1 ];
                        isDeleteFriendFind = true;
                    }
                }
                user.friends.length = user.friends.length - 1;
                await models.Users.findOneAndUpdate( {login: data.login}, { friends: user.friends}).exec();
            }
            else{
                
                user.friends.push( data.friend );
                await models.Users.findOneAndUpdate( {login: data.login}, { friends: user.friends}).exec();
            }
        }
        else{
            user.friends = [data.friend];
            await models.Users.findOneAndUpdate( {login: data.login}, { friends: user.friends}).exec();
        }

        return JSON.stringify('success');
    }

    addChat = async(data) => {
        console.log('We here');
        console.log(data);
        let userChange;
        data.users.forEach( async(user) => {
            userChange = await models.Users.findOne( {login: user} ).exec();
            userChange.chats.push( data.chat );
            await models.Users.findOneAndUpdate( {login: user}, {chats: userChange.chats} ).exec();
        })
        return JSON.stringify('success');
    }
}

module.exports = new DBusersServices