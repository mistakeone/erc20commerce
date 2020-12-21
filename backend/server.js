const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../build/contracts/PaymentProcessor.json');
const { Payment } = require('./db.js');

const app = new Koa();
const router = new Router();


router.get('/api/getPaymentId/:itemId', async ctx => {
    ctx.body = 'helloworld';
});

app
.use(cors())
.use(router.routes())
.use(router.allowedMethods());

app.listen(4000, () => {
    console.log('Server running port 4000');
});