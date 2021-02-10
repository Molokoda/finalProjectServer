const express = require('express');
const bodyParser = require('body-parser');
const pasport = require('passport');
const session = require("express-session")
const app = express();
const port = 3000;
const userRouter = require('./routes/user.routes.ts');
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.on('private', (data) => {
        io.emit( `${data._id}::${data.to}`, { message: data.message} );
    } );
})

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(bodyParser.urlencoded( { extended: false } ) );


app.use(express.static("public"));
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(pasport.initialize());
app.use(pasport.session());

app.use('/users', userRouter);

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})