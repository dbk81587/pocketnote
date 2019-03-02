import authentication from './Authentication';
import memo from './Memo'
import { combineReducers } from 'redux';

export default combineReducers({
    authentication, memo
});