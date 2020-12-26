const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');
const { Payment } = require('./db.js');

const app = new Koa();
const router = new Router();
// const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
// const networkId = new ethers.providers.getNetwork().networkId;
const items = {
    '1': {id: 1, url: 'http://UrlToDownloadItem1'},
    '2': {id: 2, url: 'http://UrlToDownloadItem2'},
}

router.get('/api/getPaymentId/:itemId', async (ctx, next) => {
    const paymentId = (Math.random()* 10000).toFixed(0);
    await Payment.create({
        id: paymentId,
        itemId: ctx.params.itemId,
        paid: false
    });

    ctx.body = {
        paymentId
    }
});
router.get('/api/getItemUrl/:paymentId', async (ctx, next) => {
    const payment = await Payment.findOne({id: ctx.params.paymentId});
    if(payment && payment.paid === true) {
        ctx.body = {
            url: items[payment.itemId].url
        };
    } else {
        ctx.body = {
            url: ''
        };
    }
})
app
.use(cors())
.use(router.routes())
.use(router.allowedMethods());

app.listen(4000, () => {
    console.log('Server running port 4000');
});

const listenToEvents = () => {
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    // const networkId = new ethers.provider.getNetwork().chainId;
    // const networkId = new ethers.providers.getNetwork().networkId;
    // const networkId = new ethers.providers.getNetwork().chainId;
    const networkId = '1608867022373';
    // console.log(provider.chainId)


    const paymentProcessor = new ethers.Contract(
        PaymentProcessor.networks[networkId].address,
        PaymentProcessor.abi,
        provider
    );

    paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date) => {
        console.log(`New payment recieved:
        from ${payer}
        amount ${amount.toString()}
        paymentId ${paymentId}
        date ${(new Date(date.toNumber()*1000)).toLocaleString()}
        `);

    const payment = await Payment.findOne({id: paymentId.toStriing()});
        if(payment) {
            payment.paid  = true;
            await payment.save();
        }
    });
};
listenToEvents();