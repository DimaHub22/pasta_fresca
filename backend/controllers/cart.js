const mongoose = require("mongoose");
const CartModel = require("../models/Cart");
const errorHandler = require('../utils/errorHandler')

module.exports.addCart = async function (req,res){
    try{
        const quantity = Number.parseInt(req.body.quantity);
        const productId = req.body.productId;

        const cart = new CartModel.items({

        })

    }catch (e){
        errorHandler(res, e)
    }
}