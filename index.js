const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const corsOptions = require('./cors/corsOptions');
connectDB();
const userRoutes = require("./controllers/userController");
const productRoutes = require("./controllers/productController");
const orderRoutes = require("./controllers/orderController");
const path = require("path");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "images")))

app.get("/", async(req, res) => {
    res.status(200).send({status: "Success", message: "Server connected!"})
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
});