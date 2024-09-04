const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product Schema
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
                    type: String
                }
            }
        }]
    }],
    farmer: {
        type: Schema.Types.ObjectId,
        ref: 'Farmer', // Reference to the Farmer model
        required: true
    }
});

const ProductModel = mongoose.model('Product', ProductSchema);
module.exports = ProductModel;
