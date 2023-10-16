const { getLastIdProduct } = require("./interactionJson");

const generateId = (initialCount=0) => {
    let count = initialCount;
    return () => {
        return ++count
    }
}

const createProductId = generateId(getLastIdProduct());

module.exports = {
    createProductId
}