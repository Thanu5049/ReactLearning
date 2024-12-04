const store=require('./app/store')
const cakeActions=require('./features/cake/cakeSlice').cakeActions
const icecreamActions=require('./features/icecream/icecreamSlice').icecreamActions
console.log('Initial State',store.getState())

//when we write the middleware logger, then we can remove the console .log statement
// const unsubscribe=store.subscribe(()=>{
//     console.log('Updated State ',store.getState())
// })

const unsubscribe=store.subscribe(()=>{})
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.ordered())
// store.dispatch(cakeActions.restocked(5))

store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.ordered())
store.dispatch(icecreamActions.restocked(5))
