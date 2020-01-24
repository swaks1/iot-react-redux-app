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

export function endLoadSummaryDashboard(deviceId) {
  return {
    type: types.END_LOAD_SUMMARY_DASHBOARD,
    data: {
      deviceId
    }
  };
}

export function loadSummaryDashboardSuccess(dashboardName, summaryDashboard) {
  return {
    type: types.LOAD_SUMMARY_DASHBOARD_SUCCESS,
    data: {
      dashboardName,
      summaryDashboard
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
        dispatch(loadSummaryDashboardSuccess(dashboardName, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadSummaryDashboard(dashboardName));
      });
  };
}
