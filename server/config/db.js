const mongoose = require('mongoose')
//all of mongoose methods are asynchronous they return a promise

//Comment and uncomment the next following lines to switch database from local/remote
//const current_URI = process.env.LOCAL_URI ;
const current_URI = process.env.MONGO_URI ;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(current_URI  ,
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected to => ${conn.connection.host.toUpperCase().bold} <=`.cyan.underline) //from colors dependency
    }catch (error){
        console.log("SARET ERREUR");
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB
