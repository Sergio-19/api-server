const nodemailer = require('nodemailer');



class MailerController {

    async postMail(req, res) {
        if(req.body.order) {
            const order = req.body.order
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'stender233@gmail.com',
                pass: 'aoybvvxbvkdfzrgd'
            }
        })

        const mailOptions = {
            from: 'stender233@gmail.com',
            to: 'stender233@gmail.com',
            subject: 'Portfolio Sergio-19',
            text: `Сообщение от: ${order.name || 'Имя не указано'} ***${order.email || 'E-mail не указан'}*** Сообщение: "${order.message || 'Путое сообщение'}"`
        };

        transporter.sendMail(mailOptions, (error, info)=> {
            if(error) {
                console.log(error)
                res.json({'success': 'false', 'message': 'Серверная ошибка при отправке сообщения'})
            } else {
                console.log(`E-mail Send!!!`, info.response)
                res.json({'success': 'true', 'message': 'Сообщение успешно отправлено!'})
            }
        })

        } else {
            res.json({'success': 'false', 'message': 'Ошибка! Отправлен пустой запрос!'})
            console.log('Ошибка - not order')
        }
        
    }

}

module.exports = new MailerController()