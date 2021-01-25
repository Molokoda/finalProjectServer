const mongoose = require('mongoose');
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
    name: String
})

const Users = mongoose.model('Users', usersSchema);
const user = new Users();

class DBusersServices{
    login = async(newUser) => {
        for(let key in newUser){
            user[key] = newUser[key];
        }
        await user.save();
        return('success')
    }

    reg = async(regUser) => {
        let answer
        await Users.find(function (err, users) {
            if (err) return console.error(err);
            let result = users.find( (user) => user.login === regUser.login && user.password === regUser.password)
            if(result){
                answer = 'success'
            }else{
                answer = 'login or password incorrect';
            }
        })

        return answer
    }
}

module.exports = new DBusersServices