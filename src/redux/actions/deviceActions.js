import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'


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

export function saveDeviceSuccess(device) {
    return { type: types.SAVE_DEVICE_SUCCESS, device}
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
                dispatch(ajaxCallError());
                //dispatch(loadDevicesSuccess(error.data))
                throw(error);
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

        dispatch(beginAjaxCall());
        //call to api
        return iotApi.toggleDeviceToDashboard(checked, id)
            .then(response => {
                dispatch(endAjaxCall());
            })
            .catch(error => {                
                dispatch(ajaxCallError());
                throw(error);
            });
    }
}


export function saveDeviceInfo(device) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        
        return iotApi.saveDeviceInfo(device)
            .then(response => {
                dispatch(saveDeviceSuccess(device));
            })
            .catch(error => {                
                dispatch(ajaxCallError());
                throw(error);
            });
    }
}