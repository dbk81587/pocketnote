import * as types from './ActionTypes';
import axios from 'axios';
import { spreadMemo, resetMemo } from './Memo';
import history from '../history';


// ==================== SIGN UP =======================

export const onSignup = (username, password) => {
    return (dispatch) => {
        dispatch(signup());
        return axios.post('/api/account/signup', { username, password })
        .then((reponse) => {
            dispatch(signupSuccess());
            dispatch(onLogin(username, password));
        }).catch((error) => {
            dispatch(signupFailure(error.response.data.code))
        });
    };
};

export const signup = () => ({
    type: types.AUTH_SIGNUP
});

export const signupSuccess = () => ({
    type: types.AUTH_SIGNUP_SUCCESS
});

export const signupFailure = (error) => ({
    type: types.AUTH_SIGNUP_FAILURE,
    error
});

// ============================ LOGIN ===================================

export const onLogin = (username, password) => {
    return dispatch => {
        return axios.post('/api/account/login', { username, password })
        .then((response) => {
            dispatch(loginSuccess(username));
            dispatch(spreadMemo(response.data));
        }).catch((error) => {
            dispatch(loginFailure());
        })
    }
};

export const loginSuccess = (username) => ({
    type: types.AUTH_LOGIN_SUCCESS,
    username
});

export const loginFailure = () => ({
    type: types.AUTH_LOGIN_FAILURE
});

// ========================== GET STATUS ===============================

export const getStatusRequest = () => {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.username));
            dispatch(spreadMemo(response.data.memo));
        }).catch((error) => {
            dispatch(getStatusFailure());
            history.push('/login');

        });
    };
};

export const getStatus = () => ({
    type: types.AUTH_GET_STATUS
});

export const getStatusSuccess = (username) => ({
    type: types.AUTH_GET_STATUS_SUCCESS,
    username
});

export const getStatusFailure = () => ({
    type: types.AUTH_GET_STATUS_FAILURE
});

// ============================= LOGOUT ==============================

export const onLogout = () => {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
            dispatch(resetMemo())
        });
    };
}

export const logout = () => ({
    type: types.AUTH_LOGOUT
});