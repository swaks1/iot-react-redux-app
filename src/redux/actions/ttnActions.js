import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

//////////////////////////////////////////////////////////////////////////////////
//deviceReducer is used because the state data is the same... for now..
//////////////////////////////////////////////////////////////////////////////

//ACTIONS
export function beginSaveExistingTTNDevice(deviceId) {
  return {
    type: types.BEGIN_SAVE_EXISTING_TTN_DEVICE,
    data: {
      deviceId
    }
  };
}

export function endSaveExistingTTNDevice(deviceId) {
  return {
    type: types.END_SAVE_EXISTING_TTN_DEVICE,
    data: {
      deviceId: deviceId
    }
  };
}

export function saveExistingTTNDeviceSuccess(device) {
  return {
    type: types.SAVE_EXISTING_TTN_DEVICE_SUCCESS,
    data: {
      deviceId: device._id,
      device: device
    }
  };
}

export function beginRegisterNewTTNDevice() {
  return {
    type: types.BEGIN_REGISTER_NEW_TTN_DEVICE,
    data: {}
  };
}

export function endRegisterNewTTNDevice() {
  return {
    type: types.END_REGISTER_NEW_TTN_DEVICE,
    data: {}
  };
}

export function registerNewTTNDeviceSuccess(ttnDevice) {
  return {
    type: types.REGISTER_NEW_TTN_DEVICE_SUCCESS,
    data: {
      ttnDevice: ttnDevice
    }
  };
}

export function beginDeleteTTNDeviceInfo(deviceId) {
  return {
    type: types.BEGIN_DELETE_TTN_DEVICE_INFO,
    data: {
      deviceId
    }
  };
}

export function endDeleteTTNDeviceInfo(deviceId) {
  return {
    type: types.END_DELETE_TTN_DEVICE_INFO,
    data: {
      deviceId
    }
  };
}

export function deleteTTNDeviceInfoSuccess(deviceId, device) {
  return {
    type: types.DELETE_TTN_DEVICE_INFO_SUCCESS,
    data: {
      deviceId,
      device
    }
  };
}

export function beginLoadExtendedTTNInfo(deviceId) {
  return {
    type: types.BEGIN_LOAD_EXTENDED_TTN_INFO,
    data: {
      deviceId
    }
  };
}

export function endLoadExtendedTTNInfo(deviceId) {
  return {
    type: types.END_LOAD_EXTENDED_TTN_INFO,
    data: {
      deviceId
    }
  };
}

export function loadExtendedTTNInfoSuccess(deviceId, extendedTTNInfo) {
  return {
    type: types.LOAD_EXTENDED_TTN_INFO_SUCCESS,
    data: {
      deviceId: deviceId,
      extendedTTNInfo: extendedTTNInfo
    }
  };
}

export function beginLoadTTNApplicationInfo() {
  return {
    type: types.BEGIN_LOAD_TTN_APPLICATION_INFO,
    data: {}
  };
}

export function endLoadTTNApplicationInfo() {
  return {
    type: types.END_LOAD_TTN_APPLICATION_INFO,
    data: {}
  };
}

export function loadTTNApplicationInfoSuccess(applicationInfo) {
  return {
    type: types.LOAD_TTN_APPLICATION_INFO_SUCCESS,
    data: {
      applicationInfo
    }
  };
}

export function beginLoadTTNDevices() {
  return {
    type: types.BEGIN_LOAD_TTN_DEVICES,
    data: {}
  };
}

export function endLoadTTNDevices() {
  return {
    type: types.END_LOAD_TTN_DEVICES,
    data: {}
  };
}

export function loadTTNDevicesSuccess(ttnDevices) {
  return {
    type: types.LOAD_TTN_DEVICES_SUCCESS,
    data: {
      ttnDevices
    }
  };
}

export function beginDeleteTTNDevice() {
  return {
    type: types.BEGIN_DELETE_TTN_DEVICE,
    data: {}
  };
}

export function endDeleteTTNDevice() {
  return {
    type: types.END_DELETE_TTN_DEVICE,
    data: {}
  };
}

export function deleteTTNDeviceSuccess(devId) {
  return {
    type: types.DELETE_TTN_DEVICE_SUCCESS,
    data: {
      devId
    }
  };
}

//THUNKS thunk async functions that return action

export function saveExistingTTNDevice(deviceId, existingTTNDevice) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginSaveExistingTTNDevice(deviceId));

    return iotApi
      .saveExistingTTNDevice(deviceId, existingTTNDevice)
      .then(response => {
        dispatch(saveExistingTTNDeviceSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endSaveExistingTTNDevice(deviceId));
      });
  };
}

export function registerNewTTNDevice(ttnDeviceToRegister) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginRegisterNewTTNDevice());

    return iotApi
      .registerNewTTNDevice(ttnDeviceToRegister)
      .then(ttnResponse => {
        dispatch(registerNewTTNDeviceSuccess(ttnResponse.data));
        return ttnResponse.data;
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endRegisterNewTTNDevice());
      });
  };
}

export function deleteTTNDeviceInfo(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeleteTTNDeviceInfo(deviceId));

    return iotApi
      .deleteTTNDeviceInfo(deviceId)
      .then(response => {
        dispatch(deleteTTNDeviceInfoSuccess(deviceId, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endDeleteTTNDeviceInfo(deviceId));
      });
  };
}

export function loadExtendedTTNInfo(deviceId, devId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadExtendedTTNInfo(deviceId));

    return iotApi
      .loadExtendedTTNInfo(devId)
      .then(response => {
        dispatch(loadExtendedTTNInfoSuccess(deviceId, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadExtendedTTNInfo(deviceId));
      });
  };
}

export function loadTTNApplicationInfo() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadTTNApplicationInfo());

    return iotApi
      .loadTTNApplicationInfo()
      .then(response => {
        dispatch(loadTTNApplicationInfoSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadTTNApplicationInfo());
      });
  };
}

export function loadTTNDevices() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadTTNDevices());

    return iotApi
      .loadTTNDevices()
      .then(response => {
        dispatch(loadTTNDevicesSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadTTNDevices());
      });
  };
}

export function deleteTTNDevice(devId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeleteTTNDevice());

    return iotApi
      .deleteTTNDevice(devId)
      .then(response => {
        dispatch(deleteTTNDeviceSuccess(devId));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endDeleteTTNDevice());
      });
  };
}
