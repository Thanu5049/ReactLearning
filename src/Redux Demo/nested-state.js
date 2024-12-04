const redux = require('redux');
const produce = require('immer').produce;
const applyMiddleware=redux.applyMiddleware;


const reduxLogger=require('redux-logger');
const logger=reduxLogger.createLogger()

const initialState = {
    name: "Thanu",
    address: {
        street: "123 Main St",
        city: "Vij",
        state: 'AP'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            //     instead of writing this much long code we can simply use immers
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }

            // }

            //using immers
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}
// const store = redux.createStore(reducer)
const store = redux.createStore(reducer,applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()