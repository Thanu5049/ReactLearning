// const redux=require('redux')
// const createStore=redux.createStore;
// const applyMiddleware=redux.applyMiddleware;
// const thunkMiddleware = require('redux-thunk').default;
// const axios=require('axios');

// const initialState={
//     loading:false,
//     users:[],
//     error:''
// }
// const FETCH_USERS_REQUESTED='FETCH_USERS_REQUESTED'
// const FETCH_USERS_SUCCEEDED='FETCH_USERS_SUCCEEDED'
// const FETCH_USERS_FAILED='FETCH_USERS_FAILED'

// const fetchUsersRequest=()=>{
//     return{
//         type:FETCH_USERS_REQUESTED
//     }
// }

// const fetchUsersSuccess=(users)=>{
//     return{
//         type:FETCH_USERS_SUCCEEDED,
//         payload:users
//     }
// }


// const fetchUsersFailure=(error)=>{
//     return{
//         type:FETCH_USERS_FAILED,
//         payload:error
//     }
// }


// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case FETCH_USERS_REQUESTED:
//             return{
//                 ...state,
//                 loading:true
//             }
//         case FETCH_USERS_SUCCEEDED:
//             return{
//                 loading:false,
//                 users:action.payload,
//                 error:''
//             }
//         case FETCH_USERS_FAILED:
//             return{
//                 loading:false,
//                 users:[],
//                 error:action.payload
//             }
//     }
// }

// //by thunk, it brings the ability to return the function instead of an action object for an action creator
// //and this func doesn't has to be pure it can be async because it receives dispatch as it's argument 
// const fetchUsers = () => {
//     return function(dispatch) {
//         dispatch(fetchUsersRequest());
//         axios
//             .get('https://jsonplaceholder.typicode.com/users')
//             .then((response) => {
//                 const users = response.data.map((user) => user.id);
//                 dispatch(fetchUsersSuccess(users));
//             })
//             .catch((error) => {
//                 dispatch(fetchUsersFailure(error.message))
//             });
//     };
// };


// const store=createStore(reducer,applyMiddleware(thunkMiddleware));
// store.subscribe(()=>{console.log(store.getState())})
// store.dispatch(fetchUsers())







const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const {thunk} = require('redux-thunk')
const axios = require('axios');

// Initial State
const initialState = {
    loading: false,
    users: [],
    error: '',
};

// Action (Type constants)
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// Action Creators
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUESTED });
const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCEEDED, payload: users });
const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILED, payload: error });

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return { ...state, loading: true };
        case FETCH_USERS_SUCCEEDED:
            return { loading: false, users: action.payload, error: '' };
        case FETCH_USERS_FAILED:
            return { loading: false, users: [], error: action.payload };
        default:
            return state;
    }
};

// Async Action Creator
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const users = response.data.map((user) => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

// Create Store
const store = createStore(reducer, applyMiddleware(thunk));

// Subscribe to Store when u delete this statement  nothing will be printed
 store.subscribe(() => console.log(store.getState()));

// Dispatch Async Action
store.dispatch(fetchUsers());
