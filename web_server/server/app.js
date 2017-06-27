let express = require('express');
let path = require('path');
let cors = require('cors');
let passport = require('passport');


let index = require('./routes/index');
let news = require('./routes/news');
let newsdemo = require('./routes/newsdemo');
let bodyParser = require('body-parser');
let auth = require('./routes/auth');
let app = express();


let config = require('./config/config.json');
const mongoose = require('mongoose');

// Set-up mongodb

mongoose.connect(config.mongoDbUri);

mongoose.connection.on('error', (err) => {
	console.error(`[!] ERROR: Mongoose connection failed: ${err}`);
	process.exit(1);
});

require('./models/user');

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '../client/build/'));
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));
app.use(bodyParser.json());


app.use('/newsdemo', newsdemo);

app.use(passport.initialize());
let localSignupStrategy = require('./passport/signup_passport');
let localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use(cors());

app.use('/', index);
app.use('/auth', auth);


const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res) {
	res.sendFile('index.html',{root: path.join(__dirname,'../client/build/')});
});

module.exports = app;
