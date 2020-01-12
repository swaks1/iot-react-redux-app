import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function deviceReducer(state = initialState.devices, action) {
  if (action.type == types.BEGIN_LOAD_DEVICES) {
    return [];
  }

  if (action.type == types.LOAD_DEVICES_SUCCESS) {
    let devices = action.data.map((item, index) => {
      let device = {
        ...stateHelper.getDevice(), //add also the initial properties from the initial state
        loading: false,
        deviceId: item._id,
        data: item
      };
      return device;
    });

    return devices;
  }

  if (action.type == types.END_LOAD_DEVICES) {
    return state;
  }

  if (action.type == types.BEGIN_LOAD_DEVICE) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {};
    if (thisDevice != null) {
      device = { ...thisDevice, loading: true }; //thisDevice contains the initial properties from the initial state
    } else {
      device = {
        ...stateHelper.getDevice(),
        loading: true,
        deviceId: action.data.deviceId,
        data: {}
      };
    }
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.LOAD_DEVICE_SUCCESS) {
    let device = {
      ...stateHelper.getDevice(),
      loading: false,
      deviceId: action.data.deviceId,
      data: action.data.data
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.END_LOAD_DEVICE) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: false };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (
    action.type == types.SAVE_DEVICE_SUCCESS ||
    action.type == types.RELOAD_DEVICE_DATATYPE_SUCCESS
  ) {
    let device = {
      ...stateHelper.getDevice(),
      loading: false,
      deviceId: action.data.deviceId,
      data: action.data.data
    };
    //preserves order in array
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  /////////////////////////////////////////////
  // REGISTER NEW or EXISTING TTN INFO
  ////////////////////////////////////////////

  if (
    action.type == types.BEGIN_SAVE_EXISTING_TTN_DEVICE ||
    action.type == types.BEGIN_REGISTER_NEW_TTN_DEVICE
  ) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: true };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (
    action.type == types.END_SAVE_EXISTING_TTN_DEVICE ||
    action.type == types.END_REGISTER_NEW_TTN_DEVICE
  ) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: false };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.SAVE_EXISTING_TTN_DEVICE_SUCCESS) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: false, data: action.data.device };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.REGISTER_NEW_TTN_DEVICE_SUCCESS) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {
      ...thisDevice,
      loading: false,
      data: action.data.device,
      extendedTTNInfo: { data: action.data.ttnDevice, loading: false }
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  /////////////////////////////////////////////
  // DELETE EXISTING TTN INFO
  ////////////////////////////////////////////

  if (action.type == types.BEGIN_DELETE_TTN_DEVICE_INFO) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: true };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.END_DELETE_TTN_DEVICE_INFO) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = { ...thisDevice, loading: false };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.DELETE_TTN_DEVICE_INFO_SUCCESS) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {
      ...thisDevice,
      data: action.data.device,
      loading: false,
      extendedTTNInfo: stateHelper.getDevice().extendedTTNInfo
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  //////////////////////////////
  // EXTENDED TTN INFO
  //////////////////////////////

  if (action.type == types.BEGIN_LOAD_EXTENDED_TTN_INFO) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {
      ...thisDevice,
      extendedTTNInfo: { ...thisDevice.extendedTTNInfo, loading: true }
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.END_LOAD_EXTENDED_TTN_INFO) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {
      ...thisDevice,
      extendedTTNInfo: { ...thisDevice.extendedTTNInfo, loading: false }
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  if (action.type == types.LOAD_EXTENDED_TTN_INFO_SUCCESS) {
    const thisDevice = getDeviceFromState(state, action.data.deviceId);
    let device = {
      ...thisDevice,
      extendedTTNInfo: { data: action.data.extendedTTNInfo, loading: false }
    };
    const devices = addDeviceToState(state, device);
    return [...devices];
  }

  return state;
}

const getDeviceFromState = (state, deviceId) => {
  let device = state.filter(item => item.deviceId == deviceId)[0];
  return device;
};

//preserves order in array
const addDeviceToState = (state, device) => {
  let devices = state.map(item => {
    if (item.deviceId == device.deviceId) {
      return device;
    }
    return item;
  });

  return devices;
};
