import {configureStore} from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice';
import icecreamReducer from '../features/icecream/icecreamSlice'


// const reduxLogger=require('redux-logger')

// const logger=reduxLogger.createLogger()

const store=configureStore({
    reducer:{
        cake:cakeReducer,
        icecream:icecreamReducer
    },
    //by default the toolkit will be having a middleware. so we append that with the logger hence we write this line
    //middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})
export default store;