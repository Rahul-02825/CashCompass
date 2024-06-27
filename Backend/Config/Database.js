const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@project1.5gw2hh9.mongodb.net/CashCompass?retryWrites=true&w=majority&appName=project1`;

    console.log(`Connecting to MongoDB Atlas...`);
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
