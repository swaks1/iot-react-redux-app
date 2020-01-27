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
      dataTypesState: { ...state.dataTypesState, loading: true },
      devicesWithDataState: { ...state.devicesWithDataState, loading: true }
    };
  }

  if (action.type == types.LOAD_SUMMARY_DASHBOARD_SUCCESS) {
    return {
      ...state,
      name: action.data.summaryDashboard.name,
      deviceIdsState: {
        ...state.deviceIdsState,
        deviceIds: action.data.summaryDashboard.value.devices,
        loading: false
      },
      dataTypesState: {
        ...state.dataTypesState,
        dataTypes: action.data.summaryDashboard.value.dataTypes,
        loading: false
      },
      devicesWithDataState: { ...state.devicesWithDataState, loading: false }
    };
  }

  if (action.type == types.END_LOAD_SUMMARY_DASHBOARD) {
    return {
      ...state,
      deviceIdsState: { ...state.deviceIdsState, loading: false },
      dataTypesState: { ...state.dataTypesState, loading: false },
      devicesWithDataState: { ...state.devicesWithDataState, loading: false }
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

  return state;
}
