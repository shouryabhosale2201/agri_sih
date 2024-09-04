const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    imgUrl: {
        type: String,
        required: true
    }
});

const CategoryModel = mongoose.model('Category', CategorySchema);
module.exports = CategoryModel;
