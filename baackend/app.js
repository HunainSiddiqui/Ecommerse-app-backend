const express = require('express');
const Product = require("./models/productModel.js");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const path = require("path");
const { faker } = require('@faker-js/faker');
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use(cookieParser()) ;

app.use(cors({
  origin: ['http://localhost:3000', 'https://ecommersebackend1.onrender.com','https://ecommerse-frontend-jji4.vercel.app','https://cartcanvas.vercel.app',"https://cartcanvas.hunain.live"],
  methods: 'GET, POST,PUT,DELETE',
  credentials: true, // Include cookies in requests
}));

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );




 // Documentatiom 
 
 const swaggerUi = require("swagger-ui-express");
 const YAML = require("yamljs");
 const swaggerFilePath = path.join(__dirname, "swagger.yaml");
 const swaggerDocument = YAML.load(swaggerFilePath);
 app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 
  

const product = require("./routes/productRoutes")
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute");
const payment = require("./routes/payment")


app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)



app.use(errorMiddleware);
module.exports = app ;

