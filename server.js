const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require("dotenv").config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

// Enable CORS
app.use(express.static("public"));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const databaseName = "sys";
const databaseUsername = "admin";
const databasePassword = "beted7wG";

const option = {
  host: "mysql-131710-0.cloudclusters.net",
  
  dialect: "mysql",
  port: 12894,

  pool: {
    maxConnections: 5,
    maxIdleTime: 30
}
};



const sequelize = new Sequelize
(
  databaseName,
  databaseUsername,
  databasePassword,
  option
   


);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = require("./models");



db.sequelize
  .sync({alter:true})
  .then(() => {
    console.log('Connection successfully1111111.');
    app.listen(5000, () => {
           console.log("server running");
         });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



// Main
app.get("/", (req, res) => {
  res.render("/public/index", { });
})

// Router list
const productRouter = require("./routes/product/product");
const productTypeRouter = require("./routes/product_type/product_type");
const buyRouter = require("./routes/buy/buy");
const sellRouter = require("./routes/sell/sell");
const serviceRouter = require("./routes/service/service");
const serviceFormRouter = require("./routes/service_form/service_form");
const supplierRouter = require("./routes/supplier/supplier");
const reportRouter = require("./routes/report/report");
const userRouter = require("./routes/user/user");

//Middleware list
const authentication = require("./middleware/authentication");

// Error handlers
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.FE_ORIGIN,
  credentials: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FE_ORIGIN);
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(cookieParser());


app.use("/user", userRouter)
//Check user is logged in
app.use(authentication.verifyAccessToken);
// Use routers
app.use("/product", productRouter);
app.use("/product-type", productTypeRouter);
app.use("/buy", buyRouter);
app.use("/sell", sellRouter);
app.use("/service", serviceRouter);
app.use("/service-form", serviceFormRouter);
app.use("/supplier", supplierRouter);
app.use("/report", reportRouter);

// use Middleware for error and not found




app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});

