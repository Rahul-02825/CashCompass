const express = require('express');
const connectDB = require('./Config/Database');
const passport = require('passport');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const path = require('path');
require('./Config/Auth');

//import custom routes
const Userapi = require('./Api/Userapi');
const Debtapi = require('./Api/Debtapi');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
const corsoption = {
    origin: 'https://cash-compass-server.vercel.app',
    credentials: true
};
app.use(cors(corsoption));
app.use(express.json());

// Session storage
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: 'mongodb://localhost/debtDb', collectionName: 'sessions' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Authentication Middleware
// function ensureAuthenticated(req, res, next) {
//     console.log('Session:', req.session);
//     console.log('User:', req.user);
//     if (req.isAuthenticated()) {
//         console.log('User is authenticated');
//         return next();
//     }
//     console.log('User is not authenticated');
//     res.status(401).json({ message: 'Not authenticated' });
// }
//console.log('ensureAuthenticated:', ensureAuthenticated); 


// Public Routes
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user._id, username: req.user.firstname });
});

app.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ username: req.user.firstname });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

//module.exports = { ensureAuthenticated };

// API Routes
app.use('/api', Userapi);
app.use('/api', Debtapi);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
