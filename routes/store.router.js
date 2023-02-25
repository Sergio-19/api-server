const Router = require('express')
const router = Router()
const StoreController = require('../controllers/store.controller')

router.post('/deliverypoints', StoreController.getDeliveryPoints)
router.post('/login', StoreController.login)
router.get('/test', StoreController.storeTest)



module.exports = router;