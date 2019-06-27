// require('dotenv').config()
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv')
const exphbs = require('express-handlebars')
const path = require("path")

var app = express()

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})) // session secret
 
app.use(passport.initialize())
 
app.use(passport.session()) // persistent login sessions


 //For Handlebars
 app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: '.hbs'
 }))

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "app/views"))
console.log(__dirname)


//Models
var models = require("./app/models")


//Routes
var authRoute = require('./app/routes/auth.js')(app, passport)


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user)
 

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
})


app.listen(8080, function (err) {

    if (!err) {
        console.log("Site is live")
    }
    else console.log(err)

});

module.exports = app;