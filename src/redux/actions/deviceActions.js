import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'
import toastr from 'toastr';


//ACTIONS
export function loadDevicesSuccess(data) {
    return { type: types.LOAD_DEVICES_SUCCESS, data };
}

export function beginLoadDevices() {
    return { type: types.BEGIN_LOAD_DEVICES }
}

export function endLoadDevices() {
    return { type: types.END_LOAD_DEVICES }
}

//THUNKS thunk async functions that return action   
export function loadDevices() {
    return function (dispatch) {// this wrapper function in important

        dispatch(beginAjaxCall());
        dispatch(beginLoadDevices());

        return iotApi.getDevices()
            .then(response => {
                dispatch(loadDevicesSuccess(response.data));
            })
            .catch(error => {                
                toastr.error(error);
                dispatch(ajaxCallError());
                //dispatch(loadDevicesSuccess(error.data))
            })
            .finally(() => {
                dispatch(endLoadDevices());
            })
    };
}

export function toggleDeviceToDashboard(checked, id, data) {
    return function (dispatch) {

        dispatch(beginAjaxCall());

        //FALSE CHANGE STATE ????
        const devices = data.map(a => ({ ...a })); // DEEP COPY !!!
        const device = devices.filter(item => item._id === id)[0];
        device.isAddedToDashboard = checked;
        dispatch(loadDevicesSuccess(devices));

        //call to api
        return iotApi.toggleDeviceToDashboard(checked, id)
            .then(response => {
                dispatch(endAjaxCall());
            })
            .catch(error => {
                toastr.error(error);
                dispatch(ajaxCallError());
            });


    }
}