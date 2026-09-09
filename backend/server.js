const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./configs/db");
const app = require("./app");

const port = process.env.PORT || 5003;

connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
