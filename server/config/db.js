const mongoose = require('mongoose')
//all of mongoose methods are asynchronous they return a promise

const current_URI = process.env.LOCAL_URI ;
//const uri = process.env.MONGO_URI ;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(current_URI);
        console.log(`MongoDB connected to => ${conn.connection.host.toUpperCase().bold} <=`.cyan.underline) //from colors dependency
    }catch (error){
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB
