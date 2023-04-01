const express = require('express');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser")
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );




 // Documentatiom 
 
 const swaggerUi = require("swagger-ui-express");
 const YAML = require("yamljs");
 const swaggerDocument = YAML.load("/home/hunain/Desktop/E-commerse-Project/baackend/swagger.yaml");
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

