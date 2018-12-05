module.exports = function(app) {
    var user;
var currentUser;
    var User = require('../models/user');
    // var Cat = require('../todologin2/cat')

    app.get('/', function(req, res) {
        res.render('login.ejs', {error: false})
    });

    app.post('/login', function(req,res) {
        //find if existing user
        user = User.find({ userName: req.body.userName }, function(err, user) {
            if(!user) {
                res.render('login.ejs', {error: true});
                console.log("hello dumb")
                // res.redirect("/login?error=true")
            }else {
                currentUser = user;
                console.log(user.password);
                if(req.body.password == currentUser.password){
                    console.log("current user: " + currentUser.userName);
                    console.log("password correct")

                }
                res.redirect("/")
            }
        });
    });


    app.post('/create', function(req,res) {
        console.log(req.body.userName);

        var newUser = new User({ userName: req.body.userName, password:req.body.password });
                newUser.save(function (err) {
                    console.log("saved: " + newUser.userName)
                });
                currentUser = newUser;
                console.log("current user: " + currentUser.userName);
                res.redirect("/");
    });

    //
    // app.get('/profile', function(req,res) {
    //
    //     // get the user starlord55
    //     Cat.find({ userName: currentUser.userName }, function(err, cats) {
    //         if (err) throw err;
    //
    //         // object of the user
    //         console.log(cats);
    //         res.render("profile.ejs", {user: currentUser, cats: cats})
    //
    //     });
    // });
    //
    // app.get('/addCat', function(req,res) {
    //     res.render("addCat.ejs", {user:currentUser})
    // });
    //
    // app.post('/addCat', function(req,res) {
    //
    //     Cat.find({}, function(err, cats) {
    //         console.log(cats);
    //     });
    //
    //     var newCat = new Cat({ name: req.body.catName, userName: req.body.userName });
    //     newCat.save(function (err) {
    //         console.log("saved: " + newCat.name)
    //     });
    //     res.render("addCat.ejs", {user:currentUser})
    //
    // });

    app.get('/logout', function(req,res) {
        currentUser = null;
        res.redirect("/")
    })
};