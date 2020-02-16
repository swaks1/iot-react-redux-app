import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginLoadAlertsModule() {
  return {
    type: types.BEGIN_LOAD_ALERTS_MODULE
  };
}

export function endLoadAlertsModule() {
  return {
    type: types.END_LOAD_ALERTS_MODULE
  };
}

export function loadAlertsModuleSuccess(alertsModule) {
  return {
    type: types.LOAD_ALERTS_MODULE_SUCCESS,
    data: {
      alerts: alertsModule.alerts,
      alertsHistory: alertsModule.alertsHistory
    }
  };
}

export function beginUpdateAlert() {
  return {
    type: types.BEGIN_UPDATE_ALERT
  };
}

export function endUpdateAlert() {
  return {
    type: types.END_UPDATE_ALERT
  };
}

export function updateAlertSuccess(alerts) {
  return {
    type: types.UPDATE_ALERT_SUCCESS,
    data: {
      alerts
    }
  };
}

//THUNKS thunk async functions that return action
export function loadAlertsModule(deviceId) {
  return function(dispatch) {
    let pageSize = 20;

    dispatch(beginAjaxCall());
    dispatch(beginLoadAlertsModule());

    return iotApi
      .loadAlerts(deviceId)
      .then(response => {
        iotApi.loadAlertsHistory(deviceId, pageSize).then(response2 => {
          let alertsModule = {
            alerts: response.data,
            alertsHistory: response2.data
          };
          dispatch(loadAlertsModuleSuccess(alertsModule));
          dispatch(endLoadAlertsModule());
        });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadAlertsModule());
        throw error;
      });
  };
}

export function updateAlert(alert) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginUpdateAlert());

    return iotApi
      .updateAlert(alert)
      .then(response => {
        dispatch(updateAlertSuccess(response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endUpdateAlert());
      });
  };
}
