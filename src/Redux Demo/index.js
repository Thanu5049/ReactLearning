const redux = require('redux');
const createStore = redux.createStore;
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';
const combineReducers=redux.combineReducers;

//The below function is the action creator
function orderCake() {
    return {
        //Action is an object and here ACTION is the type
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restock(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1) {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}
//state
const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}
//reducer (previousState,action)=>newState
//this is the single reducer for multiple items but this might be clumsy. Hence, we use multiple reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }


        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}



const initialCakeState = {
    numOfCakes: 10,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}


const initialIceCreamState = {
    numOfIceCreams: 20
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }


        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state
    }
}


const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store = createStore(rootReducer);
// console.log(store);
//console.log(store.getState()) //you will get the initial state numOfCakes:10,anotherProperty:0

//subscribing 
store.subscribe(() => console.log("Update State", store.getState()));

//unsubscribing
const unsubscribe = store.subscribe(() => console.log("Update State", store.getState()));


// When the reducer returns a new state, the store updates its state and triggers all subscriber functions. The function provided to store.subscribe() logs the updated state to the console.
// store.dispatch(orderCake())
// store.dispatch(orderCake())
//  store.dispatch(orderCake) =errorr
// store.dispatch() error
// store.dispatch(restock(3));

store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(restockIceCream(3))
unsubscribe(); //you will not get any op
