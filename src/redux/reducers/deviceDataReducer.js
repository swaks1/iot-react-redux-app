/* eslint-disable eqeqeq */
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function deviceDataReducer(state = initialState.deviceData, action) {
  if (action.type == types.BEGIN_LOAD_DEVICE_DATA) {
    const otherDeviceData = state.filter(item => item.deviceId != action.data.deviceId);
    const thisDeviceData = state.filter(item => item.deviceId == action.data.deviceId)[0];

    let deviceData = {};
    if (thisDeviceData != null) {
      deviceData = Object.assign({}, thisDeviceData);
      deviceData.loading = true;
    } else {
      deviceData = {
        loading: true,
        deviceId: action.data.deviceId,
        data: [],
        dataMonthly: []
      };
    }

    return [...otherDeviceData, deviceData];
  }

  if (action.type == types.END_LOAD_DEVICE_DATA) {
    const otherDeviceData = state.filter(item => item.deviceId != action.data.deviceId);
    const thisDeviceData = state.filter(item => item.deviceId == action.data.deviceId)[0];

    let deviceData = {};
    deviceData = Object.assign({}, thisDeviceData);
    deviceData.loading = false;

    return [...otherDeviceData, deviceData];
  }

  if (action.type == types.LOAD_DEVICE_DATA_SUCCESS) {
    const otherDeviceData = state.filter(item => item.deviceId != action.data.deviceId);
    let deviceData = {
      loading: false,
      deviceId: action.data.deviceId,
      data: action.data.data,
      dataMonthly: action.data.dataMonthly
    };

    return [...otherDeviceData, deviceData];
  }

  return state;
}
