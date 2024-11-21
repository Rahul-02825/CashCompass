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
const Accountsapi=require("./Api/Accountapi")
const Transactionapi=require("./Api/Transactionapi")
const Categoriesapi=require("./Api/Categoriesapi")

// Initialize Express app
const app = express();

// Connect to database
(async () => {
  await connectDB();
})();

// Middleware
const corsOptions = {
  origin: [
    "https://cash-compass-sigma.vercel.app",
    "http://localhost:3000",
    "https://cash-compass-git-main-rahuls-projects-56f26371.vercel.app",
  ], // Specific origin for CORS
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("<h1>Hello world</h1>");
});

// Session storage
app.use(
  require("express-session")({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@project1.5gw2hh9.mongodb.net/CashCompass?retryWrites=true&w=majority&appName=project1`,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      // httpOnly: true, // Helps prevent cross-site scripting attacks
      // secure: true, // Set to true if using HTTPS
      // sameSite: 'None'
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
  console.log("Set-Cookie Header:", res.getHeader("Set-Cookie"));
  res.json({
    user: req.user._id,
    username: req.user.firstname,
    cookie: res.getHeader("Set-Cookie") ? "true" : "false",
  });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ username:req.user.username,firstname: req.user.firstname, secondname:req.user.secondname,contact:req.user.contact,
      email:req.user.email,income:req.user.income });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

//module.exports = { ensureAuthenticated };

// API Routes
app.use("/api", Userapi);
app.use("/api", Accountsapi);
app.use("/api",Transactionapi)
app.use("/api",Categoriesapi)


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server started bhj on port ${PORT}`));
