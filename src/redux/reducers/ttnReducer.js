import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function ttnReducer(state = initialState.ttnIntegration, action) {
  /////////////////////////////////////////////
  // TTN APPLICAITON INFO
  ////////////////////////////////////////////
  if (action.type == types.BEGIN_LOAD_TTN_APPLICATION_INFO) {
    return {
      ...state,
      applicationInfoState: { ...state.applicationInfoState, loading: true }
    };
  }

  if (action.type == types.LOAD_TTN_APPLICATION_INFO_SUCCESS) {
    return {
      ...state,
      applicationInfoState: {
        ...state.applicationInfoState,
        applicationInfo: action.data.applicationInfo,
        loading: false
      }
    };
  }

  if (action.type == types.END_LOAD_TTN_APPLICATION_INFO) {
    return {
      ...state,
      applicationInfoState: { ...state.applicationInfoState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // TTN DEVICES
  ////////////////////////////////////////////

  if (action.type == types.BEGIN_LOAD_TTN_DEVICES) {
    return {
      ...state,
      deviceState: { ...state.deviceState, loading: true }
    };
  }

  if (action.type == types.LOAD_TTN_DEVICES_SUCCESS) {
    return {
      ...state,
      deviceState: {
        ...state.deviceState,
        devices: action.data.ttnDevices,
        loading: false
      }
    };
  }

  if (action.type == types.END_LOAD_TTN_DEVICES) {
    return {
      ...state,
      deviceState: { ...state.deviceState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // TTN DEVICE
  ////////////////////////////////////////////
  if (action.type == types.BEGIN_REGISTER_NEW_TTN_DEVICE) {
    return {
      ...state,
      deviceState: { ...state.deviceState, loading: true }
    };
  }

  if (action.type == types.REGISTER_NEW_TTN_DEVICE_SUCCESS) {
    return {
      ...state,
      deviceState: {
        ...state.deviceState,
        devices: [...state.deviceState.devices, action.data.ttnDevice],
        loading: false
      }
    };
  }

  if (action.type == types.END_REGISTER_NEW_TTN_DEVICE) {
    return {
      ...state,
      deviceState: { ...state.deviceState, loading: false }
    };
  }

  if (action.type == types.BEGIN_DELETE_TTN_DEVICE) {
    return state;
  }

  if (action.type == types.DELETE_TTN_DEVICE_SUCCESS) {
    let devices = state.deviceState.devices.filter(item => item.devId != action.data.devId);
    return {
      ...state,
      deviceState: {
        ...state.deviceState,
        devices: devices
      }
    };
  }

  if (action.type == types.END_DELETE_TTN_DEVICE) {
    return state;
  }

  return state;
}
