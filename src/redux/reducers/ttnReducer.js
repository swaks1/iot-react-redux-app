import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function ttnReducer(
  state = initialState.ttnIntegration,
  action
) {
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

  return state;
}
