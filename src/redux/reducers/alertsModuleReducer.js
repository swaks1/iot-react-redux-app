import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function alertsModuleReducer(
  state = initialState.alertsModule,
  action
) {
  if (action.type == types.BEGIN_LOAD_ALERTS_MODULE) {
    return {
      ...state,
      alertsState: { ...state.alertsState, loading: true },
      alertsHistoryState: { ...state.alertsHistoryState, loading: true }
    };
  }

  if (action.type == types.LOAD_ALERTS_MODULE_SUCCESS) {
    return {
      ...state,
      alertsState: {
        ...state.alertsState,
        alerts: action.data.alerts,
        loading: false
      },
      alertsHistoryState: {
        ...state.alertsHistoryState,
        alertsHistory: action.data.alertsHistory,
        loading: false
      }
    };
  }

  if (action.type == types.END_LOAD_ALERTS_MODULE) {
    return {
      ...state,
      alertsState: { ...state.alertsState, loading: false },
      alertsHistoryState: { ...state.alertsHistoryState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // UPDATE ALERT
  ////////////////////////////////////////////

  if (action.type == types.BEGIN_UPDATE_ALERT) {
    return {
      ...state,
      alertsState: { ...state.alertsState, loading: true }
    };
  }

  if (action.type == types.END_UPDATE_ALERT) {
    return {
      ...state,
      alertsState: { ...state.alertsState, loading: false }
    };
  }

  if (action.type == types.UPDATE_ALERT_SUCCESS) {
    return {
      ...state,
      alertsState: {
        ...state.alertsState,
        alerts: action.data.alerts,
        loading: false
      }
    };
  }

  return state;
}
