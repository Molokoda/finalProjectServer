const expres = require('express');
const router = expres.Router();
const controller = require('../controllers/users.controller.ts');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const postsController = require('../controllers/posts.controller.ts');
const chatsController = require('../controllers/chats.controller.ts');
const multeMiddelware = require('../middlewares/multer.middlewares.ts');


let googleUser ;

passport.use(new GoogleStrategy({
    clientID: '746699658756-r2kat6oj0pc2d4fah094jpnftcmp1psu.apps.googleusercontent.com',
    clientSecret: 'h22LPXwzB60GGvc0fuoTOtQ7',
    callbackURL: "http://localhost:3000/users/auth/google/callback"
  },
    function(accessToken, refreshToken, profile, done) {
        if (profile) {
            googleUser = profile;
            return done(null, googleUser);
        }
        else {
            return done(null, false);
        }
    }
));

passport.serializeUser(function(googleUser, done) {
    done(null, googleUser);
  });
  
passport.deserializeUser(function(googleUser, done) {
    done(null, googleUser);
});

router
    .get('/auth/google', passport.authenticate('google', { scope: 'email' } ) )
    .get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/users/reg');
        }
    )
    .get('/reg', (req, res) => {
        res.send( 'success')} ) 
    .get('/posts/user', postsController.getUsersPosts)
    .get('/allusers', controller.getAll)
    .get('/chats/getchat', chatsController.getMessages)
    .post('/login', passport.initialize(), controller.login)
    .post('/reg', controller.reg)
    .post('/posts/add', multeMiddelware, postsController.add)
    .post('/posts/friendsposts', postsController.getFriendsPosts)
    .post('/chats/create', chatsController.create)
    .put('/friends', controller.changeFrieads)
    .put('/addchat', controller.addChat)
    .put('/posts/dislike', postsController.dislike)
    .put('/posts/addcomment', postsController.addComment)
    .put('/chats/addmessage', chatsController.addMessage)
    .delete('/posts/delete', postsController.deletePost)
    
module.exports = router