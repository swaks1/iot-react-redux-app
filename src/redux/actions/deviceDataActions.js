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
export function loadDeviceData(id, dataPeriod = "") {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceData());

        return iotApi.loadDeviceData(id, dataPeriod)
            .then(response => {
                iotApi.loadDeviceDataMonthly(id)
                    .then(response2 => {
                        let merged = {
                            data: {
                                data: response.data,
                                dataMonthly: response2.data
                            }
                        }
                        dispatch(loadDeviceDataSuccess(merged.data));
                    })
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
