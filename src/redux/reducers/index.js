import { combineReducers } from 'redux'
import courseReducer from './courseReducer' //the name can be changed because inside courseReducer the function is exported as default...
import authors from './authorReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'
import devices from './deviceReducer'

const rootReducer = combineReducers({
    courses : courseReducer, //all the state that is returned from courseReducer will be available in react with state.courses
    authors, //shorthand instead of authors: authorReducer
    ajaxCallsInProgress,
    devices
});

export default rootReducer;