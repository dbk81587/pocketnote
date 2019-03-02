import * as types from './ActionTypes';
import axios from 'axios';

export const spreadMemo = (memolist) => ({
    type: types.MEMO_SPREAD,
    memolist
})

export const postMemo = (title, memo) => {
    return dispatch => {
        return axios.post('/api/memo/create', { title, memo })
        .then((response) => {
            dispatch(createMemo(title, memo))
            dispatch(spreadMemo(response.data))
        }).catch((error) => {
            console.log(error)
        })
    }
};

export const deleteRequest = (index, id) => {
    return dispatch => {
        return axios.post('/api/memo/delete', { id })
        .then((response) => {
            dispatch(deleteMemo(index))
        }).catch((error) => {
            console.log(error)
        })
    }
};

export const editRequest = (index, title, memo, id) => {
    return dispatch => {
        return axios.put('/api/memo/edit', { title, memo, id })
        .then((response) => {
            dispatch(editMemo(index,title,memo))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const createMemo = (title, memo) => ({
    type: types.MEMO_CREATE,
    title,
    memo
});

export const deleteMemo = (index) => ({
    type: types.MEMO_DELETE,
    index
});

export const editMemo = (index, title, memo) => ({
    type: types.MEMO_EDIT,
    index,
    title,
    memo
});

export const resetMemo = () => ({
    type: types.MEMO_RESET
});