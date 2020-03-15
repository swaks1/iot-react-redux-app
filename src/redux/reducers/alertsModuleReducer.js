import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function alertsModuleReducer(state = initialState.alertsModule, action) {
  if (action.type == types.BEGIN_LOAD_ALERTS_MODULE) {
    const thisAlertItem = getAlertFromState(state, action.data.deviceId);
    let alertItem = {};

    if (thisAlertItem != null) {
      alertItem = changeAlertItemLoading(thisAlertItem, true);
    } else {
      const initialAlertItem = stateHelper.getAlertItem();
      alertItem = changeAlertItemLoading(initialAlertItem, true);
      alertItem = {
        ...alertItem,
        deviceId: action.data.deviceId
      };
    }
    const alertsModuleItems = addAlertToState(state, alertItem);
    return [...alertsModuleItems];
  }

  if (action.type == types.LOAD_ALERTS_MODULE_SUCCESS) {
    const initialAlertItem = stateHelper.getAlertItem();
    let alertItem = changeAlertItemLoading(initialAlertItem, false);
    alertItem = {
      ...alertItem,
      deviceId: action.data.deviceId,
      alertsState: {
        ...alertItem.alertsState,
        alerts: action.data.alerts
      },
      alertsHistoryState: {
        ...alertItem.alertsHistoryState,
        alertsHistory: action.data.alertsHistory
      }
    };
    const alertModuleItems = addAlertToState(state, alertItem);
    return [...alertModuleItems];
  }

  if (action.type == types.END_LOAD_ALERTS_MODULE) {
    const thisAlertItem = getAlertFromState(state, action.data.deviceId);
    let alertItem = changeAlertItemLoading(thisAlertItem, false);
    const alertModuleItems = addAlertToState(state, alertItem);
    return [...alertModuleItems];
  }

  /////////////////////////////////////////////
  // UPDATE ALERT
  ////////////////////////////////////////////

  if (action.type == types.BEGIN_UPDATE_ALERT) {
    const thisAlertItem = getAlertFromState(state, action.data.deviceId);
    let alertItem = {
      ...thisAlertItem,
      alertsState: {
        ...thisAlertItem.alertsState,
        loading: true
      }
    };
    const alertModuleItems = addAlertToState(state, alertItem);
    return [...alertModuleItems];
  }

  if (action.type == types.END_UPDATE_ALERT) {
    const thisAlertItem = getAlertFromState(state, action.data.deviceId);
    let alertItem = {
      ...thisAlertItem,
      alertsState: {
        ...thisAlertItem.alertsState,
        loading: false
      }
    };
    const alertModuleItems = addAlertToState(state, alertItem);
    return [...alertModuleItems];
  }

  if (action.type == types.UPDATE_ALERT_SUCCESS) {
    const thisAlertItem = getAlertFromState(state, action.data.deviceId);
    let alertItem = {
      ...thisAlertItem,
      alertsState: {
        ...thisAlertItem.alertsState,
        alerts: action.data.alerts,
        loading: false
      }
    };
    const alertModuleItems = addAlertToState(state, alertItem);
    return [...alertModuleItems];
  }

  return state;
}

// HELPERS

const changeAlertItemLoading = (alertItem, loading) => {
  return {
    ...alertItem,
    alertsState: {
      ...alertItem.alertsState,
      loading: loading
    },
    alertsHistoryState: {
      ...alertItem.alertsHistoryState,
      loading: loading
    }
  };
};

const getAlertFromState = (state, deviceId) => {
  let alertItem = state.filter(item => item.deviceId == deviceId)[0];
  return alertItem;
};

const addAlertToState = (state, alertItem) => {
  // returns the existing state array with modification of the corresponding alertItem
  // preserves order in array
  let alertItems = state.map(item => {
    if (item.deviceId == alertItem.deviceId) {
      return alertItem;
    }
    return item;
  });

  // if doesnt exist add it and return it together with others
  if (!alertItems.find(item => item.deviceId == alertItem.deviceId)) {
    return [...alertItems, alertItem];
  }
  return alertItems;
};
