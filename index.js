const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const corsOptions = require('./cors/corsOptions');
connectDB();
const path = require("path");
const mainRoutes = require("./routes/mainRoutes");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", mainRoutes)
app.use("/uploads", express.static(path.join(__dirname, "images")))

app.get("/", async(req, res) => {
    res.status(200).send({status: "Success", message: "Server connected!"})
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
});