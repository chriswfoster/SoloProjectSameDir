const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")

// const { dbUser, database } = require("../config").massive;
const { secret } = require("./config.js").session
const { domain, clientID, clientSecret } = require("./config.js").auth0

// this imports the config.js content linking your DB
const connectionString = require("./config").massive
const controller = require("./controller.js")

//2.  declare app. App should be ABOVE any terms using the word app, like the massiveConnection request below
const app = express()

//this will allow you to get rid of the proxy server. It'll reference the server directly.
app.use(express.static(`${__dirname}/../build`))

//remember app goes before this.
const massiveConnection = massive(connectionString) // tell massive to make the connection
  .then(db => app.set("db", db)) // if connection exists, set 'db' to db
  .catch(console.log) // then log the error if exists

//3.
const port = 80

//4. add middlewares
//this is the bodyparser json. Allows us to convert stuff to req.body. This json is only a method on the body-parser json.
app.use(json())
app.use(cors())

// add session to config
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())
//now tell passport which strategy to use
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      //says go get the db, and check to see if the user exists
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          console.log(response)
          //if user doesn't exist, create him
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([
                profile.id,
                profile.displayName,
                profile.nickname
              ])
              .then(created => {
                console.log(created)
                return done(null, created[0])
              })
            //if user does exist, return the user at 0 index of response array
          } else {
            return done(null, response[0])
          }
        })
    }
  )
)

passport.serializeUser(function(user, done) {
  done(null, user)
})
passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

//sends you to log in after login button pressed
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/yourpage" //this is the page they'll land on. Could make it their user page.
  })
)
//when sent here, you log out and return to /
app.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/")
})

//will check if there's a req.user. If there wasn't, send 404, if there was, send back user.
app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(401)
  res.status(200).json(req.user)
})

app.post("/api/postcomment", controller.postComment)
app.post("/api/like", controller.likePost)
app.post("/api/share", controller.sharePost)
app.post("/api/post", controller.createPost)
app.get("/api/getallposts", controller.getAllPosts)
app.get("/api/getyourposts/:id", controller.getAllYourPosts)
app.get("/api/getallcomments/:id", controller.getAllComments)
app.put("/api/editStory", controller.editStory)
app.put("/api/editInfluence", controller.editInfluence)
app.put("/api/editBackstory", controller.editBackstory)

//5. Test to see if it's functioning properly. If server is live, should see "Success" on localhost/api/test
//can test it in app.js within react too, in the componentDidMount feature
// *********************
// app.get('/api/test', (req, res, next) => {
//     res.json("Success"); //this json is only a property within the reponse object/method.
// })

//massive looks in root folder for a folder labeled DB, then it looks for the sql files as listed below.
// app.get('/api/test', (req, res, next) => {
//     const db = req.app.get('db');
//     db
//     .getUsers()
//     .then(response => {
//         res.json(response)
//     })
//         .catch(console.log)
// })

//same as the app.get from above
app.get("/api/test", (req, res, next) => {
  req.app
    .get("db")
    .getUsers()
    .then(response => {
      res.json(response)
    })
    .catch(console.log)
})

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(port, () => {
  console.log(`Listening on dat port: ${port}`)
})
