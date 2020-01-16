import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

//ACTIONS

//for all devices
export function beginLoadDevices() {
  return { type: types.BEGIN_LOAD_DEVICES };
}

export function loadDevicesSuccess(data) {
  return { type: types.LOAD_DEVICES_SUCCESS, data };
}

export function endLoadDevices() {
  return { type: types.END_LOAD_DEVICES };
}

//for one
export function beginLoadDevice(deviceId) {
  return {
    type: types.BEGIN_LOAD_DEVICE,
    data: {
      deviceId: deviceId
    }
  };
}

export function endLoadDevice(deviceId) {
  return {
    type: types.END_LOAD_DEVICE,
    data: {
      deviceId: deviceId
    }
  };
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

export function beginRegisterDevice() {
  return {
    type: types.BEGIN_REGISTER_IOT_DEVICE,
    data: {}
  };
}

export function endRegisterDevice() {
  return {
    type: types.END_REGISTER_IOT_DEVICE,
    data: {}
  };
}

export function registerDeviceSuccess(device) {
  return {
    type: types.REGISTER_IOT_DEVICE_SUCCESS,
    data: {
      device
    }
  };
}

export function beginDeleteDevice() {
  return {
    type: types.BEGIN_DELETE_IOT_DEVICE,
    data: {}
  };
}

export function endDeleteDevice() {
  return {
    type: types.END_DELETE_IOT_DEVICE,
    data: {}
  };
}

export function deleteDeviceSuccess(deviceId) {
  return {
    type: types.DELETE_IOT_DEVICE_SUCCESS,
    data: {
      deviceId
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
  };
}

export function reloadDeviceDataTypeSucess(device) {
  return {
    type: types.RELOAD_DEVICE_DATATYPE_SUCCESS,
    data: {
      deviceId: device._id,
      data: device
    }
  };
}

//THUNKS thunk async functions that return action
export function loadDevices() {
  return function(dispatch) {
    // this wrapper function in important

    dispatch(beginAjaxCall());
    dispatch(beginLoadDevices());

    return iotApi
      .getDevices()
      .then(response => {
        dispatch(loadDevicesSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        //dispatch(loadDevicesSuccess(error.data))
        throw error;
      })
      .finally(() => {
        dispatch(endLoadDevices());
      });
  };
}

export function loadDevice(id) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDevice(id));

    return iotApi
      .getDevice(id)
      .then(response => {
        dispatch(loadDeviceSuccess(id, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadDevice(id));
      });
  };
}

export function registerDevice(iotDevice) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginRegisterDevice());

    return iotApi
      .registerDevice(iotDevice)
      .then(response => {
        dispatch(registerDeviceSuccess(response.data));
        return response.data;
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endRegisterDevice());
      });
  };
}

export function deleteDevice(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeleteDevice());

    return iotApi
      .deleteDevice(deviceId)
      .then(response => {
        dispatch(deleteDeviceSuccess(deviceId));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endDeleteDevice());
      });
  };
}

export function toggleDeviceToDashboard(checked, id, data) {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    //FALSE CHANGE STATE ????
    const devices = data.map(a => ({ ...a })); // DEEP COPY !!!
    const device = devices.filter(item => item._id === id)[0];
    device.isAddedToDashboard = checked;
    dispatch(loadDevicesSuccess(devices));

    dispatch(beginAjaxCall());
    //call to api
    return iotApi
      .toggleDeviceToDashboard(checked, id)
      .then(response => {
        dispatch(endAjaxCall());
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      });
  };
}

export function saveDeviceInfo(device) {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    return iotApi
      .saveDeviceInfo(device)
      .then(response => {
        dispatch(saveDeviceSuccess(device));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      });
  };
}

export function reloadDeviceDataType(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());

    return iotApi
      .reloadDeviceDataType(deviceId)
      .then(response => {
        dispatch(reloadDeviceDataTypeSucess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      });
  };
}
