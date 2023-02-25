const Router = require('express')
const router = Router()
const MailerController = require('../controllers/mailer.controller')

router.post('/mail', MailerController.postMail)



module.exports = router;