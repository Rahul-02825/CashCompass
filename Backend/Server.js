const express = require("express");
const connectDB = require("./Config/Database");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const path = require("path");
require("./Config/Auth");
require("dotenv").config();

// Import custom routes
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
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("<h1>Hello world</h1>");
});

// Session storage
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true, // Helps prevent cross-site scripting attacks
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'None', // Ensure cross-site cookies are allowed
    },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Public Routes
app.post("/login", passport.authenticate("local"), (req, res) => {
  console.log('Set-Cookie Header:', res.getHeader('Set-Cookie'));
  res.json({ user: req.user._id, username: req.user.firstname, cookie: res.getHeader('Set-Cookie') ? "true" : "false" });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ username: req.user.firstname });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// API Routes
app.use("/api", Userapi);
app.use("/api", Debtapi);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
