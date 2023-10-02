const app = require("./app") ;
const connectDB = require('./config/db');

const dotenv = require('dotenv')

dotenv.config({path: "baackend/config/config.env"})

connectDB();

// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });



 
  
 
  
  
  
  
// Server Connection

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`)
})


// Handling Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      
      process.exit(1);
    });
  });
  