import { combineReducers } from 'redux'
import ajaxCallsInProgress from './ajaxStatusReducer'
import deviceReducer from './deviceReducer' //the name can be changed because inside courseReducer the function is exported as default...
import commands from './commandReducer'
import deviceData from './deviceDataReducer'

const rootReducer = combineReducers({
    devices : deviceReducer, //all the state that is returned from courseReducer will be available in react with state.devices
    commands,
    deviceData,
    ajaxCallsInProgress
});

export default rootReducer;