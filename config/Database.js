const mongoose = require("mongoose");

const connectDatabase = () => {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
        return;
    }

    mongoose.connect(dbURL, {
      
        
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDatabase;
