import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import * as stateHelper from "../utils/stateHelper";

export default function summaryDashboardReducer(
  state = initialState.summaryDashboard,
  action
) {
  if (action.type == types.BEGIN_LOAD_SUMMARY_DASHBOARD) {
    return {
      ...state,
      name: action.data.dashboardName,
      deviceIdsState: { ...state.deviceIdsState, loading: true },
      dataTypesState: { ...state.dataTypesState, loading: true }
    };
  }

  if (action.type == types.LOAD_SUMMARY_DASHBOARD_SUCCESS) {
    return {
      ...state,
      name: action.data.summaryDashboard.name,
      periodInPast: action.data.summaryDashboard.value.periodInPast,
      deviceIdsState: {
        ...state.deviceIdsState,
        deviceIds: action.data.summaryDashboard.value.devices,
        loading: false
      },
      dataTypesState: {
        ...state.dataTypesState,
        dataTypes: action.data.summaryDashboard.value.dataTypes,
        loading: false
      }
    };
  }

  if (action.type == types.END_LOAD_SUMMARY_DASHBOARD) {
    return {
      ...state,
      deviceIdsState: { ...state.deviceIdsState, loading: false },
      dataTypesState: { ...state.dataTypesState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // UPDATE PERIOD IN PAST
  ////////////////////////////////////////////

  if (action.type == types.UPDATE_PERIOD_IN_PAST_ON_SUMMARY_DASHBOARD_SUCCESS) {
    return {
      ...state,
      periodInPast: action.data.periodInPast
    };
  }

  /////////////////////////////////////////////
  // UPDATE DEVICES
  ////////////////////////////////////////////
  if (action.type == types.BEGIN_UPDATE_DEVICES_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      deviceIdsState: { ...state.deviceIdsState, loading: true }
    };
  }

  if (action.type == types.UPDATE_DEVICES_ON_SUMMARY_DASHBOARD_SUCCESS) {
    return {
      ...state,
      deviceIdsState: {
        ...state.deviceIdsState,
        deviceIds: action.data.deviceIds,
        loading: false
      }
    };
  }

  if (action.type == types.END_UPDATE_DEVICES_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      deviceIdsState: { ...state.deviceIdsState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // UPDATE DATA TYPES
  ////////////////////////////////////////////
  if (action.type == types.BEGIN_UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      dataTypesState: { ...state.dataTypesState, loading: true }
    };
  }

  if (action.type == types.UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD_SUCCESS) {
    return {
      ...state,
      dataTypesState: {
        ...state.dataTypesState,
        dataTypes: action.data.dataTypes,
        loading: false
      }
    };
  }

  if (action.type == types.END_UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      dataTypesState: { ...state.dataTypesState, loading: false }
    };
  }

  /////////////////////////////////////////////
  // LOAD DEVICES WITH DATA
  ////////////////////////////////////////////
  if (action.type == types.BEGIN_LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      devicesWithDataState: { ...state.devicesWithDataState, loading: true }
    };
  }

  if (
    action.type == types.LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD_SUCCESS
  ) {
    return {
      ...state,
      devicesWithDataState: {
        ...state.devicesWithDataState,
        devices: action.data.devices,
        loading: false
      }
    };
  }

  if (action.type == types.END_LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD) {
    return {
      ...state,
      devicesWithDataState: { ...state.devicesWithDataState, loading: false }
    };
  }

  return state;
}
