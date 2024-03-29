const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
let Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017/datafinal",
    {
        dbName: "datafinal",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

//web server port
const port = process.env.PORT || 4000;
const host = "localhost";

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const pname = req.body.productName;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pimage = req.body.image;

    const formData = new Product({
        _id: p_id,
        productName: pname,
        price: pprice,
        description: pdescription,
        image: pimage,
    });
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.put("/update", async (req, res) => {
    try {
      const updateProduct = req.body;
      const query = { _id: updateProduct._id };
      await Product.findOneAndUpdate(query, updateProduct, { new: true });
      const messageResponse = {
        "message": `Product ${updateProduct._id} updated correctly`,
      };
      res.send(JSON.stringify(messageResponse));
    } catch (err) {
      console.log("Error while updating product: " + err);
    }
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});