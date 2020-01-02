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
      data: device
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
            dev_id: ttnResponse.data.devId,
            app_id: ttnResponse.data.appId
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
