var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {

   
    
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signup'
        }
 
    ));
 
 
    app.get('/dashboard', isLoggedIn, authController.dashboard);
 
    // app.get('/home', authController.home);
 
    app.get('/logout', authController.logout);
    //temp
    // app.get('/index', authController.index);
 
 
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',
 
            failureRedirect: '/signin'
        }
 
    ));
 
    app.get('/', function (req, res) {

        res.render('index')
    

    })
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}

