const mongoose = require('mongoose');

const connectDatabase = async ()=>{

    try {
        const databaseConfig = "mongodb://127.0.0.1/ContactKeeper";
        const connect = await mongoose.connect(databaseConfig);
        console.log(`da ket noi mongodb: ${connect.connection.host}`);
    } catch (error) {
        console.log('chua the ket noi toi mongodb');
    }
}

module.exports = connectDatabase;