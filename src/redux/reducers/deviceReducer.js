import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function courseReducer(state = initialState.devices, action) {
    switch (action.type) {

        case types.LOAD_DEVICES_SUCCESS:
            return {
                data: [...action.data],
                loading: state.loading
            };

        case types.BEGIN_LOAD_DEVICES:
            return {
                data: [...state.data],
                loading: true
            }

        case types.END_LOAD_DEVICES:
            return {
                data: [...state.data],
                loading: false
            }

        case types.SAVE_DEVICE_SUCCESS:
            const filtered = state.data.filter(item => item._id !== action.device._id);
            var newItem = Object.assign({}, action.device);
            return {
                data: [...filtered, newItem],
                loading: state.loading
            }


        default:
            return state;
    }
}
