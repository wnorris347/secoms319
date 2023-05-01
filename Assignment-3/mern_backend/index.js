const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
let Product = require('./dataSchema.js');

app.use(express.json());
app.use(cors());

//show images in front end
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://localhost:27017/reactdata",
    {
        dbName: "reactdata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

//web server port
const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});