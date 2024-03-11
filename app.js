const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
// const {passport} = require('./src/config/googleAuthConfig');
const mongodb = require("./src/database/database");
// db config
mongodb.createDbConnection();

// Initialize Passport
// app.use(passport.initialize());

// Using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require("./src/routers/auth.routes");
app.use("/auth", authRoutes);
const habitRoutes = require("./src/routers/habit.routes");
app.use("/habit", habitRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port} successfully`);
});
