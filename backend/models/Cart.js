const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "positions",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
});

const CartSchema = new mongoose.Schema({
    items: [ItemSchema],
}, {
    timestamps: true
})

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;