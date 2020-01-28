import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginLoadSummaryDashboard(dashboardName) {
  return {
    type: types.BEGIN_LOAD_SUMMARY_DASHBOARD,
    data: {
      dashboardName
    }
  };
}

export function endLoadSummaryDashboard() {
  return {
    type: types.END_LOAD_SUMMARY_DASHBOARD
  };
}

export function loadSummaryDashboardSuccess(summaryDashboard) {
  return {
    type: types.LOAD_SUMMARY_DASHBOARD_SUCCESS,
    data: {
      summaryDashboard
    }
  };
}

export function beginUpdateDevicesOnSummaryDashboard() {
  return {
    type: types.BEGIN_UPDATE_DEVICES_ON_SUMMARY_DASHBOARD
  };
}

export function endUpdateDevicesOnSummaryDashboard() {
  return {
    type: types.END_UPDATE_DEVICES_ON_SUMMARY_DASHBOARD
  };
}

export function updateDevicesOnSummaryDashboardSuccess(deviceIds) {
  return {
    type: types.UPDATE_DEVICES_ON_SUMMARY_DASHBOARD_SUCCESS,
    data: {
      deviceIds
    }
  };
}

export function beginUpdateDataTypesOnSummaryDashboard() {
  return {
    type: types.BEGIN_UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD
  };
}

export function endUpdateDataTypesOnSummaryDashboard() {
  return {
    type: types.END_UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD
  };
}

export function updateDataTypesOnSummaryDashboardSuccess(dataTypes) {
  return {
    type: types.UPDATE_DATA_TYPES_ON_SUMMARY_DASHBOARD_SUCCESS,
    data: {
      dataTypes
    }
  };
}

export function beginLoadDevicesWithData() {
  return {
    type: types.BEGIN_LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD
  };
}

export function endLoadDevicesWithData() {
  return {
    type: types.END_LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD
  };
}

export function loadDevicesWithDataSuccess(devicesWithData) {
  return {
    type: types.LOAD_DEVICES_WITH_DATA_ON_SUMMARY_DASHBOARD_SUCCESS,
    data: {
      devices: devicesWithData
    }
  };
}

//THUNKS thunk async functions that return action
export function loadSummaryDashboard(dashboardName) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadSummaryDashboard(dashboardName));

    return iotApi
      .loadSummaryDashboard(dashboardName)
      .then(response => {
        dispatch(loadSummaryDashboardSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadSummaryDashboard());
      });
  };
}

export function updateDevicesOnSummaryDashboard(dashboardName, deviceIds) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginUpdateDevicesOnSummaryDashboard());

    return iotApi
      .updateDevicesOnSummaryDashboard(dashboardName, deviceIds)
      .then(response => {
        dispatch(updateDevicesOnSummaryDashboardSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endUpdateDevicesOnSummaryDashboard());
      });
  };
}

export function updateDataTypesOnSummaryDashboard(dashboardName, dataTypes) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginUpdateDataTypesOnSummaryDashboard());

    return iotApi
      .updateDataTypesOnSummaryDashboard(dashboardName, dataTypes)
      .then(response => {
        dispatch(updateDataTypesOnSummaryDashboardSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endUpdateDataTypesOnSummaryDashboard());
      });
  };
}
//period in hours currently
export function loadDevicesWithData(deviceIds, dataTypes, period = 2222) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDevicesWithData());

    return iotApi
      .loadDevicesWithData(deviceIds, dataTypes, period)
      .then(response => {
        dispatch(loadDevicesWithDataSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadDevicesWithData());
      });
  };
}
