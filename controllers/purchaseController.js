const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database/database')
const User = require('../models/user')
const Model = require('../models/model')
const Option = require('../models/option')
const Engine = require('../models/engine')
const Purchase = require('../models/purchase')

exports.allPurchase = async (req, res) => {
    try {
        const purchases = await Purchase.findAll();
        res.status(200).json(purchases);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }  
};

exports.myPurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.findAll({
            where: {userId: id}
        });
        res.status(200).json(purchases);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }  
}

exports.purchase = async (req, res) => {
    try{
        const { modelId, userId, optionTaken, price } = req.body

        const purchase = await Purchase.create({
            userId,
            modelId,
            price,
            optionTaken
        });

        res.status(201).json({ purchase });

    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.get = async (req, res) => {
    try {
        const { id } = req.params;
        const purchases = await Purchase.findAll({
            where: {userId: id}
        });
        res.status(200).json(purchases);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }  
}

exports.create = async (req, res) => {
    try{
        const { modelId, userId, optionTaken, price } = req.body

        const purchase = await Purchase.create({
            userId,
            modelId,
            price,
            optionTaken
        });

        res.status(201).json({ purchase });

    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { modelId, userId, optionTaken, price } = req.body;

        const existingPurchase = await Purchase.findByPk(id);

        if (!existingPurchase) {
            return res.status(404).json("Purchase not found");
        }

        existingPurchase.userId = userId;
        existingPurchase.modelId = modelId;
        existingPurchase.price = price;
        existingPurchase.optionTaken = optionTaken;

        await existingPurchase.save();

        res.status(200).json({ purchase: existingPurchase });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const existingPurchase = await Purchase.findByPk(id);

        if (!existingPurchase) {
            return res.status(404).json("Purchase not found");
        }

        await existingPurchase.destroy();

        res.status(200).json("Purchase deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
}


