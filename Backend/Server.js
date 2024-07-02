const express = require("express");
const connectDB = require("./Config/Database");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const path = require("path");
require("./Config/Auth");
require("dotenv").config();

//import custom routes
const Userapi = require("./Api/Userapi");
const Debtapi = require("./Api/Debtapi");

// Initialize Express app
const app = express();

// Connect to database
(async () => {
  await connectDB();
})();

// Middleware
const corsOptions = {
  origin: "https://cash-compass-sigma.vercel.app", // Specific origin for CORS
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("<h1>Hello world</h1>");
});

// Session storage
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@project1.5gw2hh9.mongodb.net/CashCompass?retryWrites=true&w=majority&appName=project1`,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24, 
      sameSite:"none",
    }, // 1 day
  })
);

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
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user._id, username: req.user.firstname });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    req.session = { cookie: "" };
    res.json({ username: req.user.firstname });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

//module.exports = { ensureAuthenticated };

// API Routes
app.use("/api", Userapi);
app.use("/api", Debtapi);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server started bhj on port ${PORT}`));
