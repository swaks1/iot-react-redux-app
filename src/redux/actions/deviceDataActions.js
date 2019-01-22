import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'


export function beginLoadDeviceData() {
    return { type: types.BEGIN_LOAD_DEVICE_DATA }
}

export function endLoadDeviceData() {
    return { type: types.END_LOAD_DEVICE_DATA }
}

export function loadDeviceDataSuccess(data) {
    return { type: types.LOAD_DEVICE_DATA_SUCCESS, data };
}


//THUNKS thunk async functions that return action
export function loadDeviceData(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceData());

        return iotApi.loadDeviceData(id)
            .then(response => {
                dispatch(loadDeviceDataSuccess(response.data));
            })
            .catch((error) => {
                dispatch(ajaxCallError());
                throw (error);
            })
            .finally(() => {
                dispatch(endLoadDeviceData());
            })
    };
}
