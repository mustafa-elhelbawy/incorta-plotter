import { combineReducers } from 'redux';
import columns from './columns';
import loader from './loader';

export default combineReducers({
    columns,
    loader
});