import state from "../reducers/initialState";

export const getDevice = () => {
  var device = state.devices[0];
  let copy = { ...device, extendedTTNInfo: { ...device.extendedTTNInfo } };

  return copy;
};
