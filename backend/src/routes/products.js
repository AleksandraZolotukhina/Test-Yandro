const express = require('express');
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/products.js');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');

router.get('/', getProducts);

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        weight: Joi.string().required(),
        orderDate: Joi.date().iso().required(),
        hasInStock: Joi.boolean().required(),
        customer: Joi.string().required()
    })
}), createProduct);

router.patch('/:id', celebrate({
    body: Joi.object().keys({
        hasInStock: Joi.boolean().required(),
        customer: Joi.string().required()
    }),
    params: Joi.object().keys({
        id: Joi.number().required()
    }),
}), updateProduct);

router.delete('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().required()
    }),
}), deleteProduct);

module.exports = router;