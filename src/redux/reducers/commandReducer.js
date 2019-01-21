import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function commandReducer(state = initialState.commands, action) {
    switch (action.type) {
        
        case types.BEGIN_LOAD_DEVICE_COMMANDS:
            return {
                data: state.data,
                loading: true
            }

        case types.END_LOAD_DEVICE_COMMANDS:
            return {
                data: state.data,
                loading: false
            }

        case types.LOAD_DEVICE_COMMANDS_SUCCESS:
            return {
                data: [...action.data],
                loading: state.loading
            };

        case types.ACTIVATE_DEVICE_COMMAND_SUCCESS:
        case types.DEACTIVATE_DEVICE_COMMAND_SUCCESS:
        case types.UPDATE_LOCATION_COMMAND_SUCCESS:
        case types.CHANGE_INTERVAL_COMMAND_SUCCESS:
            return {
                data: [...action.data],
                loading: state.loading
            };

        default:
            return state;
    }
}
