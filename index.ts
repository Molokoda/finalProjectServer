const express = require('express');
const bodyParser = require('body-parser');
const pasport = require('passport');
const session = require("express-session")
const app = express();
const port = 3000;
const userRouter = require('./routes/user.routes.ts');
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static("public"));
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(pasport.initialize());
app.use(pasport.session());

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})