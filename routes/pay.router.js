const Router = require('express')
const router = Router()
const PayController = require('../controllers/pay.controller')

router.post('/makepayment', PayController.makePayment);


module.exports = router;
