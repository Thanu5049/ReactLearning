const configureStore=require('@reduxjs/toolkit').configureStore
const reduxLogger=require('redux-logger')
const cakeReducer=require('../features/cake/cakeSlice')
const icecreamReducer=require('../features/icecream/icecreamSlice')

const logger=reduxLogger.createLogger()

const store=configureStore({
    reducer:{
        cake:cakeReducer,
        icecream:icecreamReducer
    },
    //by default the toolkit will be having a middleware. so we append that with the logger hence we write this line
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})
module.exports=store