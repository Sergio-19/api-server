const databaseQuery = require('../database')


class StoreController {



     // поиск пунктов выдачи товаров в базе
    async getDeliveryPoints(req, res) {

        const search = req.body.search
       
        async function pointsQuery(connection) {
           await connection.query(`SELECT * FROM points WHERE city LIKE '%${search}%' OR address LIKE '%${search}%'`, (error, result)=> {
               if(error) {
                   console.log('Ошибка при запросе к базе данных', error)
                   res.json({"message": 'Поиск не дал результатов', "success": 'false'})
               } else {
                   res.json({"message": "Успешно", "success": result.length === 0 ? false : true, "points": result})
               }
           
           })
        }

        databaseQuery(pointsQuery)
        console.log('POINTS POINTS')

        
    }

    //вход в профиль

    async login(req, res) {
   
        if(req.body.data) {
            const {data} = req.body
          
            async function usersQuery(connection) {
                await connection.query(`SELECT * FROM users WHERE email = '${data.email}'`, (error, result)=> {
                    if(error) {
                        console.log('Ошибка при запросе к базе данных', error)
                        res.json({"message": 'Поиск не дал результатов', "success": 'false'})
                    } else {
                        if(result.length > 0){
                            const user = result[0]
                            res.json({"message": "Успешно", "success": result.length === 0 ? false : true, "user": user})
                        } else {
                            res.json({"message": "Пользователь с таким email не найден... Похоже вы у нас еще не совершали покупки.", "success": result.length === 0 ? false : true})
                        }
                     
                        
                    }

                
                })
             }

             databaseQuery(usersQuery)
        }
    }

    //Тестовый роут

    async storeTest(req, res) {
        res.json({"test": "Тестовый роут"})
    }

}

module.exports = new StoreController()