const mongoose = require("mongoose");

const uri =
  "mongodb+srv://rahuldudi1349:8H3rj97oLvwUXHEj@cluster0.8la9hoo.mongodb.net/?retryWrites=true&w=majority";

let dbConnect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.log(`MongoDB connection FAILED: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;

// password 8H3rj97oLvwUXHEj
