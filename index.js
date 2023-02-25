const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const path = require('path')
const config = require('./config')
const payRouter = require('./routes/pay.router');
const storeRouter = require('./routes/store.router');
const mailerRouter = require('./routes/mailer.router');

app.use(cors())
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))
app.use(bodyParser.json({limit: '5mb'}))

const PORT = config.port || 5000

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}...`)
})

//API

app.use('/pay', payRouter);
app.use('/store', storeRouter);
app.use('/mailer', mailerRouter);


//API