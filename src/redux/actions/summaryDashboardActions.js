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
