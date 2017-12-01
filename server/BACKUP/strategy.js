const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;

module.exports = new Auth0Strategy({
  domain:       domain,
  clientID:     clientID,
  clientSecret: clientSecret,
  callbackURL:  '/login'
 },
   function(accessToken, refreshToken, extraParams, profile, done) {
    //    req.app.get('db')
    //    .find({
    //        userID:profile.ID
    //    }) 
    //    .then(function(reponse){
    // if(!Response.data){
    // }else {
    //         return done(null; profile);
    //     }
    // })

     return done(null, profile);
   }
 );