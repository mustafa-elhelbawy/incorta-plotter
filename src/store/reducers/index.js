import { combineReducers } from 'redux';
import loader from './loader';
import columns from './columns';
import dimension from './dimension';
import measure from './measure';
import data from './data';

export default combineReducers({
    loader,
    columns,
    dimension,
    measure,
    data
});