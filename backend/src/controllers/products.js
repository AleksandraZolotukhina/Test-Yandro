const { getProductsData, saveProductsData } = require("../utils/interactionJson");
const NotFoundError = require("../errors/notFoundError");
const { createProductId } = require("../utils/index");

const getProducts = (req, res, next) => {
    try {
        const products = getProductsData();
        res.send(products)
    }
    catch (err) {
        next(err)
    }
}

const createProduct = (req, res, next) => {
    try {
        const products = getProductsData();
        const newProduct = { id: createProductId(), ...req.body }
        products.push(newProduct);
        saveProductsData(products);

        res.send({ success: true, message: 'Товар создан успешно!', data: newProduct })
    }
    catch (err) {
        next(err)
    }

}
const updateProduct = (req, res, next) => {
    try {
        const id = req.params['id'];
        const products = getProductsData();
        const productUpdate = products.find(product => product.id === id);

        if(productUpdate === undefined) {
            throw new NotFoundError('Нет товара с таким id');
        }

        const newProducts = products.map((product) => {
            if(product.id === id) {
                const {orderDate, weight, name} = product
                return { id, orderDate, weight, name, ...req.body }
            }
            return product
        })
        
        saveProductsData(newProducts);

        res.send({ success: true, message: 'Товар обновлен успешно!' })
    }
    catch (err) {
       next(err)
    }

}

const deleteProduct = (req, res, next) => {
    try {
        const id = req.params['id'];
        const products = getProductsData();
        const productDelete = products.find(product => product.id === id);

        if(productDelete === undefined) {
            throw new NotFoundError('Нет товара с таким id');
        }

        const newProducts = products.filter((product) => product.id !== id);
        saveProductsData(newProducts);

        res.send({ success: true, message: 'Товар удален успешно!' })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}