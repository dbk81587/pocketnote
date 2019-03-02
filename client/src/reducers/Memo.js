import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
    notes: List([])
});

function memo(state = initialState, action) {
    const notes = state.get('notes');
    switch (action.type) {
        case types.MEMO_SPREAD:
            return state.set('notes', fromJS(action.memolist))

        case types.MEMO_CREATE:
            return state.set('notes', notes.push(Map({ title: action.title, memo: action.memo })))
        
        case types.MEMO_DELETE:
            return state.set('notes', notes.delete(action.index))

        case types.MEMO_EDIT:
            return state.set('notes', notes.set(action.index, Map({ title: action.title, memo: action.memo })))

        case types.MEMO_RESET:
            return state.set('notes', List([]))
        
        default:
            return state
    }
};

export default memo;