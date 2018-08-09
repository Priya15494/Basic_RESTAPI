const express=require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose=require('mongoose')
const bodyParser= require('body-parser')
const cookieParser = require('cookie-parser')
const globalErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
//var helmet = require('helmet')
//declaring an instance or creating an application instance
const app = express()

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)

// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
})
// end Bootstrap models

// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

//has to be declared after the routes and models 
// calling global 404 handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler)
//app.use(helmet())

app.listen(appConfig.port, () =>{
    console.log('Example app listening on port 3000!');
     //creating the mongodb connection
    let db=mongoose.connect(appConfig.db.uri);
   })



// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler