import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'


//ACTIONS

//for all devices
export function beginLoadDevices() {
    return { type: types.BEGIN_LOAD_DEVICES }
}

export function loadDevicesSuccess(data) {
    return { type: types.LOAD_DEVICES_SUCCESS, data };
}

export function endLoadDevices() {
    return { type: types.END_LOAD_DEVICES }
}

//for one
export function beginLoadDevice(deviceId) {
    return {
        type: types.BEGIN_LOAD_DEVICE,
        data: {
            deviceId: deviceId
        }
    }
}

export function endLoadDevice(deviceId) {
    return {
        type: types.END_LOAD_DEVICE,
        data: {
            deviceId: deviceId
        }
    }
}

export function loadDeviceSuccess(deviceId, device) {
    return {
        type: types.LOAD_DEVICE_SUCCESS,
        data: {
            deviceId: deviceId,
            data: device
        }
    };
}

export function saveDeviceSuccess(device) {
    return {
        type: types.SAVE_DEVICE_SUCCESS,
        data: {
            deviceId: device._id,
            data: device
        }
    }
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
                throw (error);
            })
            .finally(() => {
                dispatch(endLoadDevices());
            })
    };
}

export function loadDevice(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDevice(id));

        return iotApi.getDevice(id)
            .then(response => {
                dispatch(loadDeviceSuccess(id, response.data));
            })
            .catch((error) => {
                dispatch(ajaxCallError());
                throw (error);
            })
            .finally(() => {
                dispatch(endLoadDevice(id));
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
                throw (error);
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
                throw (error);
            });
    }
}