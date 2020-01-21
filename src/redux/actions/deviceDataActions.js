import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginLoadDeviceData(deviceId) {
  return {
    type: types.BEGIN_LOAD_DEVICE_DATA,
    data: {
      deviceId: deviceId
    }
  };
}

export function endLoadDeviceData(deviceId) {
  return {
    type: types.END_LOAD_DEVICE_DATA,
    data: {
      deviceId: deviceId
    }
  };
}

export function loadDeviceDataSuccess(deviceId, data, dataMonthly) {
  return {
    type: types.LOAD_DEVICE_DATA_SUCCESS,
    data: {
      deviceId: deviceId,
      data: data,
      dataMonthly: dataMonthly
    }
  };
}

//THUNKS thunk async functions that return action
export function loadDeviceData(id, dataPeriod = "", deviceType = "") {
  return function(dispatch) {
    let pageSize = 20;
    if (dataPeriod == "monthly") pageSize = 12;
    if (dataPeriod == "daily") pageSize = 5;
    if (dataPeriod == "lastHour") pageSize = 60;
    if (dataPeriod == "last24h") pageSize = 24;

    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceData(id));

    return iotApi
      .loadDeviceData(id, dataPeriod, pageSize, deviceType)
      .then(response => {
        iotApi.loadDeviceDataMonthly(id, deviceType).then(response2 => {
          let data = response.data;
          let dataMonthly = response2.data;

          dispatch(loadDeviceDataSuccess(id, data, dataMonthly));
          dispatch(endLoadDeviceData(id));
        });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadDeviceData(id));
        throw error;
      });
  };
}
