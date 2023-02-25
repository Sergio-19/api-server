const config = require('../config')
const YooKassa = require('yookassa');
const databaseQuery = require('../database')




class PayController {

//здесь в заказ добавляю ключ, идентифицирующий откуда пришел заказ hopastore    

async makePayment(req, res) {
    if(req.body.order) {
        const order = req.body.order
        console.log(order)
        const yooKassa = new YooKassa({
            shopId: config.shopid,
            secretKey: config.apikey
        });
    
       if(order.shop === 'hopastore') {
        const payment = await yooKassa.createPayment({
            amount: {
              value: `${order.sum}.00`,
              currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
              type: "redirect",
              return_url: "https://hopastore.ru"
            },
            description: `Заказ №${order.order}, ${order.email || ''}`
        });
        res.json({'payment': payment})

        //проверка наличия покупателя в базе, если такого покупателя еще нет, то создаю

        const {name, phone, email, address} = order

        async function myQuery(connection) {
            connection.query(`INSERT INTO users (name, phone, email, address, orders) VALUES ('${name}', '${phone}', '${email}', '${address}', '${order.order}')`, (err)=> {
                if(err) {
                    console.log('Произошла ошибка при добавлении в базу данных', err)
                } else {
                    console.log('Пользователь успешно добавлен в базу...')
                }
            })
        }

        databaseQuery(myQuery)

       }

       
    } else {
        res.json({'message': 'Был отправлен пустой запрос...'})
    }
    
    

}



}

module.exports = new PayController()