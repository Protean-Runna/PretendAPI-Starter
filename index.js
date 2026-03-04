const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const mongoose = require("mongoose");
const app = express();


const PORT = process.env.PORT || 5000;


app.use(cors());

// Swagger Documentation route goes here
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// use this if you want to use mongoDB

/*
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://URLHERE",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// put all the firebase routes here
const mocker_routes = require("./routes/api/mockers");



// serves static files
app.use(express.static('public'));

// uses all the api routes (firebase)
app.use("/api/mockers", mocker_routes);




// Live listener

app.listen(PORT, () => console.log(`API is live on Port ${PORT}`));