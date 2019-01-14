import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function courseReducer(state = initialState.devices, action) {
    switch (action.type) {

        case types.LOAD_DEVICES_SUCCESS:
            return action.devices;

        default:
            return state;
    }
}
