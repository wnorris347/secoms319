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
    const ptitle = req.body.title;
    const pprice = req.body.price;
    const pdescription = req.body.description;
    const pcategory = req.body.category;
    const pimage = req.body.image;
    const prate = req.body.rating.rate;
    const pcount = req.body.rating.count;
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

const formData = new Product({
    _id: p_id,
    title: ptitle,
    price: pprice,
    description: pdescription,
    category: pcategory,
    image: pimage,
    rating: { rate: prate, count: pcount },
});