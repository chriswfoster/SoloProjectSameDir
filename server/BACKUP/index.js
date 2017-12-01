const express = require('express');
const session = require('express-session');

const secret = require('./config.js')
const passport = require('passport')

const strategy = require('./strategy')

const app = express();

app.use(session ({
    secret,
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize());
app.use(passport.session());

//this tells passport that whatever is making a request, should use our auth0 strategy
passport.use(strategy);

// after done in serializeuser, done will attach user to session - user is locked in as req.session.
//we receive the profile as user here
passport.serializeUser(function(user, done) {
    done(null, { id: user.id, display: user.displayName, nickname: user.nickname });
  });
  // deserialize is fired for every request back to the server. Allows you to modify the user's info on the server.
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  

//the end point /login will fire off passport.authenticate. 
//it will take in a configuration authentication with 3 key property pairs.
//if succeeds, will redirect user to /me. If failure, will redirect to /login. And failureFlash will show a reason why it failed
  app.get( '/login', 
    passport.authenticate('auth0', 
      { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }
    )
  );


  app.get("/me", (req, res, next) => {
      if (req.user){
          res.json(req.user)
      } else {
          res.redirect('/login');
      }
  })



const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );