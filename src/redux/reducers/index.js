import { combineReducers } from 'redux'
import ajaxCallsInProgress from './ajaxStatusReducer'
import deviceReducer from './deviceReducer' //the name can be changed because inside courseReducer the function is exported as default...

const rootReducer = combineReducers({
    devices : deviceReducer, //all the state that is returned from courseReducer will be available in react with state.devices
    ajaxCallsInProgress
});

export default rootReducer;