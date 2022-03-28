import {combineReducers} from 'redux';
import notesReducers from './notesReducers';
import userReducer from './userReducers';

export const rootReducer = combineReducers({
    notesReducers,
    userReducer
})