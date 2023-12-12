const express = require('express')
const cors = require('cors')
const multer = require('multer');
const bodyParser = require('body-parser');
const basicRoutes = require('./routes/basicRoutes')
const productRoutes = require('./routes/productRoutes')
const creditRoutes = require('./routes/creditRoutes')
const dataRoutes = require('./routes/dataRoutes')
const searchRoutes = require('./routes/searchRoutes')
const userRoutes = require('./routes/userRoutes')
const session = require('express-session')
const { SESSION_SECRET } = require('./config')


module.exports = async (app) => {
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs')

    // middleware for static files
    app.use(express.static(__dirname + '/public'))
    
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({ extended: true }));

    // const upload = multer();
    // app.use(upload.array());

    // setting d express session middleware
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))

    // vendors account routes
    app.use('/', basicRoutes)

    // product routes
    app.use('/products', productRoutes)
    
    // product routes
    app.use('/credits', creditRoutes)

    // supply data to admin routes
    app.use('/giveData', dataRoutes)

    // users routes
    app.use('/users', userRoutes)
    
    // search routes
    app.use('/search', searchRoutes)
    
}