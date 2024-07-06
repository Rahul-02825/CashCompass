const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Models/Usermodel");
const bcrypt = require("bcryptjs"); 

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!bcrypt.compareSync(password, user.password)) { 
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user information into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
  console.log(user.id);
});

// Deserialize user information from session
// passport.deserializeUser(async function (id, done) {
//   try {
//     const user = await User.findById(id).exec();
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
