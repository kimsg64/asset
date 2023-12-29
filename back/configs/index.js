const dotenv = require("dotenv");

dotenv.config();

// console.log(`MONGO URI::: ${process.env.MONGO_URI}`);
// console.log(`PORT::: ${process.env.PORT}`);

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
};
