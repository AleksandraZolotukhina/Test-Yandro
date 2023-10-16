const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const goodsRouter = require('./src/routes/products.js');
const { errors } = require('celebrate');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', goodsRouter);

app.use(errors());
app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;

    res
    .status(statusCode)
    .send({
        message: statusCode === 500 ? 'На сервере произошла ошибка' : message
     });
});

app.listen(PORT, () => console.log(`Сервер работает на порту - ${PORT}`))