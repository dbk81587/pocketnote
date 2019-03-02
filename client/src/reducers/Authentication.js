import * as types from '../actions/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
    status: Map({
        isLoggedIn: false,
        currentUser: '',
        valid: false
    }),
    register: Map({
        status: 'INIT',
        error: -1
    })
});

function authentication(state = initialState, action) {
    if(typeof state === "undefined")
        state = initialState;
    switch (action.type) {
        case types.AUTH_SIGNUP:
            return state.set('register', Map({ status: 'Waiting', error: -1 }))
        
        case types.AUTH_SIGNUP_SUCCESS:
            return state.setIn(['register', 'status'], 'SUCCESS')
        
        case types.AUTH_SIGNUP_FAILURE:
            return state.set('register', Map({ status: 'FAILURE', error: action.error}))
        
        case types.AUTH_LOGIN_SUCCESS: 
            return state.set('status', Map({ isLoggedIn: true, currentUser: action.username, valid: true}))
        
        case types.AUTH_LOGIN_FAILURE: 
            return state.set('status', Map({ isLoggedIn: false, currentUser: '', valid: false }))
        
        case types.AUTH_GET_STATUS:
            return state.setIn(['status', 'isLoggedIn'], true)
        
        case types.AUTH_GET_STATUS_SUCCESS:
            return state.set('status', Map({isLoggedIn: true, currentUser: action.username, valid: true}))
        
        case types.AUTH_GET_STATUS_FAILURE:
            return state.set('status', Map({ isLoggedIn: false, currentUser: '', valid: false }))

        case types.AUTH_LOGOUT:
            return state.set('status', Map({ isLoggedIn: false, currentUser: '', valid: false }))

        default:
            return state;
    }
};

export default authentication;