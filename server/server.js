var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  logger = require('morgan'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  localStrategy = require('passport-local').Strategy,
  app = express();


var Fund = require('./models/fund.js');
var User = require('./models/user.js');
require('./config/passport.js')(passport);

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/sashas-app');
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB")
})

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'we da best! beet da r3st, so gr3te.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: 'we da best! beet da r3st, so gr3te.'}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

app.get('/fund', function(req, res) {
  var query;
  if (req.query.status) {
    query = {status: req.query.status}
  } else {
    query = {};
  }
  Fund.find(query, function(err, response) {
    return res.status(200).json(response);
  });
})
app.post('/fund', function(req, res) {
  var fund = new Fund(req.body);
  fund.save(function(err, response) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(response);
    }
  });
});
app.put('/fund', function(req, res) {
  Fund.findByIdAndUpdate(req.query.id, req.body, function(err, response) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(response);
    }
  });
});

app.delete('/fund', function(req, res){
  Fund.findByIdAndRemove(req.query.id, function(err,response){
    if(err){
      return res.status(500).json(err);
    }else{
      return res.json(response);
    }
  })

app.post('/user/register', function(req, res) {
  User.register(new User({ username: req.body.username, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }),
  req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});
app.post('/user/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
        user: user
      })
    });
  })(req, res, next);
});
app.get('/user/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});
app.get('/user/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
})
});
app.put('/user', function(req, res) {
  User.findByIdAndUpdate(req.query.id, req.body, function(err, response) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(response);
    }
  });
});


app.listen(12030, function() {
  console.log('Listening in on port 12030');
});
