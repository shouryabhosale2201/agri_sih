const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: [{
        data: [{
            attributes: {
                url: {
                    type: String,
                    required: true
                }
            }
        }]
    }]
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
