import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginLoadAlertsModule(deviceId) {
  return {
    type: types.BEGIN_LOAD_ALERTS_MODULE,
    data: {
      deviceId
    }
  };
}

export function endLoadAlertsModule(deviceId) {
  return {
    type: types.END_LOAD_ALERTS_MODULE,
    data: {
      deviceId
    }
  };
}

export function loadAlertsModuleSuccess(deviceId, alertsModule) {
  return {
    type: types.LOAD_ALERTS_MODULE_SUCCESS,
    data: {
      deviceId,
      alerts: alertsModule.alerts,
      alertsHistory: alertsModule.alertsHistory
    }
  };
}

export function beginUpdateAlert(deviceId) {
  return {
    type: types.BEGIN_UPDATE_ALERT,
    data: {
      deviceId
    }
  };
}

export function endUpdateAlert(deviceId) {
  return {
    type: types.END_UPDATE_ALERT,
    data: {
      deviceId
    }
  };
}

export function updateAlertSuccess(deviceId, alerts) {
  return {
    type: types.UPDATE_ALERT_SUCCESS,
    data: {
      deviceId,
      alerts
    }
  };
}

//THUNKS thunk async functions that return action
export function loadAlertsModule(deviceId) {
  return function(dispatch) {
    let pageSize = 20;

    dispatch(beginAjaxCall());
    dispatch(beginLoadAlertsModule(deviceId));

    return iotApi
      .loadAlerts(deviceId)
      .then(response => {
        iotApi.loadAlertsHistory(deviceId, pageSize).then(response2 => {
          let alertsModule = {
            alerts: response.data,
            alertsHistory: response2.data
          };
          dispatch(loadAlertsModuleSuccess(deviceId, alertsModule));
          dispatch(endLoadAlertsModule());
        });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadAlertsModule(deviceId));
        throw error;
      });
  };
}

export function updateAlert(alert) {
  let deviceId = alert.device;
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginUpdateAlert(deviceId));

    return iotApi
      .updateAlert(alert)
      .then(response => {
        dispatch(updateAlertSuccess(deviceId, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endUpdateAlert(deviceId));
      });
  };
}
