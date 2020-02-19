import state from "../reducers/initialState";

export const getDevice = () => {
  var device = state.devices[0];
  let copy = { ...device, extendedTTNInfo: { ...device.extendedTTNInfo } };

  return copy;
};

export const getAlertItem = () => {
  var alertItem = state.alertsModule[0];
  let copy = {
    ...alertItem,
    deviceId: null,
    alertsState: {
      alerts: [],
      loading: false
    },
    alertsHistoryState: {
      alertsHistory: [],
      loading: false
    }
  };

  return copy;
};
