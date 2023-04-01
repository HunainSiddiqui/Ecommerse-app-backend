const mongoose = require("mongoose") ;

const connectDB = async() => {
    
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL) ;
        console.log("Connected_to_MongoDB") ;
  
};

module.exports = connectDB ;