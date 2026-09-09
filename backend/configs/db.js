const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb has successfully connected");
    } catch (error) {
        console.error("error in mongodb connection:", error.message);
        process.exit(1)
    }
}

module.exports = connectDB;