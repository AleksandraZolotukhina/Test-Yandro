const fs = require('fs');
const path = './products.json';

const getProductsData = () => {
    const jsonData = fs.readFileSync(path)
    return JSON.parse(jsonData)
}

const saveProductsData = (products) => {
    const stringifyData = JSON.stringify(products)
    fs.writeFileSync(path, stringifyData)
}

const getLastIdProduct = () => {
    const products = getProductsData();

    return products[products.length - 1]?.id ?? 0
}

module.exports = {
    getProductsData,
    saveProductsData,
    getLastIdProduct
}