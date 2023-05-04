const mongoose = require("mongoose");

const ReactFormDataSchema = new mongoose.Schema({
    _id: {type: Number},
    product: {type: String},
    price: {type: Number},
    description: {type: String},
    image: {type: String},
},
    { collection: "bakery_catalog" }
)
    
const Product = mongoose.model('Product', ReactFormDataSchema)
module.exports = Product;