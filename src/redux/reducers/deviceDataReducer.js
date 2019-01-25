import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function deviceDataReducer(state = initialState.deviceData, action) {
    switch (action.type) {

        case types.BEGIN_LOAD_DEVICE_DATA:
            return {
                data: state.data,
                dataMonthly: state.dataMonthly,
                loading: true
            }

        case types.END_LOAD_DEVICE_DATA:
            return {
                data: state.data,
                loading: false
            }

        case types.LOAD_DEVICE_DATA_SUCCESS:
            return {
                data: [...action.data.data],
                dataMonthly: [...action.data.dataMonthly],
                loading: state.loading
            };

        default:
            return state;
    }
}
