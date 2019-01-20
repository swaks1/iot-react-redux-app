import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function commandReducer(state = initialState.commands, action) {
    switch (action.type) {

        case types.LOAD_DEVICE_COMMANDS_SUCCESS:
            return action.data

        case types.ACTIVATE_DEVICE_COMMAND_SUCCESS:
            return action.data

        default:
            return state;
    }
}
