const express = require('express')
const databaseConnection = require('./database/database')
const { PORT, dbURI } = require('./config')
const expressApp = require('./express-app')

const app = express()

const startServer = async () => {
    await databaseConnection(dbURI)

    expressApp(app)

    app.listen(PORT, () => {
        console.log('vendors running...')
    })
    .on('error', (err) => {
        console.log(err)
        process.exit()
    })
}

startServer()