const mongoose = require('mongoose');
require("dotenv").config()

const connectDatabase = async ()=>{

    try {
        // const databaseConfig = "mongodb://127.0.0.1/ContactKeeper";       
        const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwkxo3r.mongodb.net/?retryWrites=true&w=majority`
        // const connect = await mongoose.connect(databaseConfig);
        const connect = await mongoose.connect(URL);
        // console.log("c");
        console.log(`da ket noi mongodb: ${connect.connection.host}`);
    } catch (error) {
        console.log('chua the ket noi toi mongodb');
        console.log(error);
    }
}

module.exports = connectDatabase;