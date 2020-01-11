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

export function beginRegisterNewTTNDevice(deviceId) {
  return {
    type: types.BEGIN_REGISTER_NEW_TTN_DEVICE,
    data: {
      deviceId
    }
  };
}

export function endRegisterNewTTNDevice(deviceId) {
  return {
    type: types.END_REGISTER_NEW_TTN_DEVICE,
    data: {
      deviceId
    }
  };
}

export function registerNewTTNDeviceSuccess(device, ttnDevice) {
  return {
    type: types.REGISTER_NEW_TTN_DEVICE_SUCCESS,
    data: {
      deviceId: device._id,
      device: device,
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

export function registerNewTTNDevice(deviceId, ttnDeviceToRegister) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginRegisterNewTTNDevice(deviceId));

    return iotApi
      .registerNewTTNDevice(deviceId, ttnDeviceToRegister)
      .then(ttnResponse => {
        iotApi
          .saveExistingTTNDevice(deviceId, {
            app_id: ttnResponse.data.appId,
            dev_id: ttnResponse.data.devId
          })
          .then(deviceResponse => {
            dispatch(
              registerNewTTNDeviceSuccess(deviceResponse.data, ttnResponse.data)
            );
            dispatch(endRegisterNewTTNDevice(deviceId));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endRegisterNewTTNDevice(deviceId));
        throw error;
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
